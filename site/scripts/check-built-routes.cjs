const fs = require('node:fs');
const path = require('node:path');
const {parse} = require('parse5');
const {
  canonicalRoutes,
  redirectMap,
  staticRedirectMap,
} = require('../route-contract.cjs');

const jobsRedirect = {
  route: '/jobs/',
  canonical: 'https://adamthepugh.com',
  destination: 'https://docs.google.com/spreadsheets/d/1rECWXCGhDKUiB3-LIwEEe1teaPWaGxgSK28AZADFF4g/edit?gid=55693553#gid=55693553',
};

function routeFile(outDir, route) {
  const relative = route.replace(/^\//, '');
  return route.endsWith('.html')
    ? path.join(outDir, relative)
    : path.join(outDir, relative, 'index.html');
}

function refreshTarget(file) {
  let target;
  function visit(node) {
    const attrs = Object.fromEntries((node.attrs || []).map(({name, value}) => [name, value]));
    if (node.tagName === 'meta' && attrs['http-equiv']?.toLowerCase() === 'refresh' && target === undefined) {
      const match = attrs.content?.match(/^\s*\d+(?:\.\d+)?\s*;\s*url\s*=\s*(.*?)\s*$/i);
      if (match) target = match[1].replace(/^["']|["']$/g, '');
    }
    for (const child of node.childNodes || []) visit(child);
  }
  visit(parse(fs.readFileSync(file, 'utf8')));
  return target;
}

function sitemapUrls(file) {
  return [...fs.readFileSync(file, 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

function jobsRedirectMetadata(file) {
  const metadata = {noindex: false, canonical: undefined};
  function visit(node) {
    const attrs = Object.fromEntries((node.attrs || []).map(({name, value}) => [name, value]));
    if (node.tagName === 'meta' && attrs.name?.toLowerCase() === 'robots') {
      metadata.noindex = attrs.content?.toLowerCase().split(/\s*,\s*|\s+/).includes('noindex') || false;
    }
    if (node.tagName === 'link' && attrs.rel?.toLowerCase().split(/\s+/).includes('canonical')) {
      metadata.canonical = attrs.href;
    }
    for (const child of node.childNodes || []) visit(child);
  }
  visit(parse(fs.readFileSync(file, 'utf8')));
  return metadata;
}

function checkBuiltRoutes({outDir, siteUrl}) {
  const errors = [];
  const expectedUrls = canonicalRoutes.map((route) => new URL(route, siteUrl).href).sort();
  const sitemapFile = path.join(outDir, 'sitemap.xml');
  let actualUrls = [];

  for (const route of canonicalRoutes) {
    const file = routeFile(outDir, route);
    if (!fs.existsSync(file)) errors.push(`${route}: canonical page is missing: ${file}`);
  }

  if (!fs.existsSync(sitemapFile)) {
    errors.push(`Sitemap is missing: ${sitemapFile}`);
  } else {
    actualUrls = sitemapUrls(sitemapFile).sort();
    if (JSON.stringify(actualUrls) !== JSON.stringify(expectedUrls)) {
      errors.push(`Sitemap must contain only the ${canonicalRoutes.length} canonical URLs.\nExpected: ${expectedUrls.join(', ')}\nActual: ${actualUrls.join(', ')}`);
    }
  }

  const jobsFile = routeFile(outDir, jobsRedirect.route);
  if (!fs.existsSync(jobsFile)) {
    errors.push(`${jobsRedirect.route}: static redirect page is missing: ${jobsFile}`);
  } else {
    const source = fs.readFileSync(jobsFile, 'utf8');
    const metadata = jobsRedirectMetadata(jobsFile);
    if (!metadata.noindex) errors.push(`${jobsRedirect.route}: static redirect page must use robots noindex`);
    if (metadata.canonical !== jobsRedirect.canonical) {
      errors.push(`${jobsRedirect.route}: expected canonical ${jobsRedirect.canonical}, found ${metadata.canonical || 'none'}`);
    }
    if (refreshTarget(jobsFile) !== undefined) {
      errors.push(`${jobsRedirect.route}: external redirect must not use meta refresh`);
    }
    if (!source.includes(jobsRedirect.destination)) {
      errors.push(`${jobsRedirect.route}: expected Google Sheet destination ${jobsRedirect.destination}`);
    }
  }
  if (actualUrls.includes(new URL(jobsRedirect.route, siteUrl).href)) {
    errors.push(`${jobsRedirect.route}: static redirect page must be excluded from the sitemap`);
  }

  const allRedirects = new Map([...redirectMap, ...staticRedirectMap]);
  const redirectSources = new Set([...allRedirects.keys()].map((source) => new URL(source, siteUrl).href));
  for (const [source, expectedTarget] of allRedirects) {
    const file = routeFile(outDir, source);
    if (!fs.existsSync(file)) {
      errors.push(`${source}: redirect page is missing: ${file}`);
      continue;
    }
    const target = refreshTarget(file);
    if (target === undefined) {
      errors.push(`${source}: redirect page has no valid meta refresh target`);
      continue;
    }
    const sourceUrl = new URL(source, siteUrl);
    const targetUrl = new URL(target, sourceUrl).href;
    const expectedTargetUrl = new URL(expectedTarget, siteUrl).href;
    if (targetUrl !== expectedTargetUrl) {
      errors.push(`${source}: expected direct redirect to ${expectedTargetUrl}, found ${targetUrl}`);
    }
    if (redirectSources.has(targetUrl)) {
      errors.push(`${source}: redirect chain targets another legacy route: ${targetUrl}`);
    }
    if (!expectedUrls.includes(targetUrl)) {
      errors.push(`${source}: redirect target is not a canonical route: ${targetUrl}`);
    }
  }

  return {
    canonical: canonicalRoutes.length,
    redirects: allRedirects.size,
    errors,
  };
}

if (require.main === module) {
  const result = checkBuiltRoutes({
    outDir: path.join(__dirname, '..', 'build'),
    siteUrl: 'https://adamthepugh.com',
  });
  if (result.errors.length) {
    console.error(`Built route check failed:\n${result.errors.join('\n')}`);
    process.exitCode = 1;
  } else {
    console.log(`Built route check passed: ${result.canonical} canonical pages and ${result.redirects} direct legacy redirects.`);
  }
}

module.exports = {checkBuiltRoutes, jobsRedirect};
