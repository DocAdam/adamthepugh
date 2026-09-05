const fs = require('node:fs');
const path = require('node:path');
// Reuse the HTML parser in the existing, locked Docusaurus dependency tree.
const {parse} = require('parse5');

function walk(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}

function readHtml(file) {
  const ids = new Set();
  const links = [];
  let base;
  function visit(node) {
    const attrs = Object.fromEntries((node.attrs || []).map(({name, value}) => [name, value]));
    if (attrs.id !== undefined) ids.add(attrs.id);
    if (node.tagName === 'a' && attrs.name) ids.add(attrs.name);
    if (['a', 'area'].includes(node.tagName) && attrs.href !== undefined) links.push(attrs.href);
    if (node.tagName === 'base' && attrs.href !== undefined && base === undefined) base = attrs.href;
    for (const child of node.childNodes || []) visit(child);
  }
  visit(parse(fs.readFileSync(file, 'utf8')));
  return {ids, links, base};
}

function checkLinks(outDir, siteUrl) {
  const files = new Map(walk(outDir).map((file) => [path.relative(outDir, file).split(path.sep).join('/'), file]));
  const pages = new Map([...files].filter(([name]) => name.endsWith('.html')).map(([name, file]) => [name, readHtml(file)]));
  if (!pages.size) throw new Error(`No HTML pages found in ${outDir}`);
  const origin = new URL(siteUrl).origin;
  const errors = [];
  let checked = 0;
  for (const [name, page] of pages) {
    const pagePath = '/' + name.replace(/(^|\/)index\.html$/, '$1');
    const pageUrl = new URL(pagePath, origin);
    const base = page.base === undefined ? pageUrl : new URL(page.base, pageUrl);
    for (const href of page.links) {
      try {
        const url = new URL(href, base);
        if (!['https:', 'http:'].includes(url.protocol) || url.origin !== origin) continue;
        checked++;
        const target = decodeURIComponent(url.pathname).replace(/^\//, '');
        const candidates = target.endsWith('/') || !target
          ? [target + 'index.html']
          : [target, target + '/index.html'];
        const resolved = candidates.find((candidate) => files.has(candidate));
        if (!resolved) throw new Error(`missing destination ${url.pathname}`);
        // Directory redirects change the base URL, but preserve the fragment.
        const fragment = decodeURIComponent(url.hash.slice(1)).split(':~:text=')[0];
        if (fragment && pages.has(resolved) && !pages.get(resolved).ids.has(fragment)) {
          throw new Error(`missing anchor #${fragment} in /${resolved}`);
        }
      } catch (error) {
        errors.push(`${pagePath}: ${JSON.stringify(href)} -> ${error.message}`);
      }
    }
  }
  return {pages: pages.size, checked, errors};
}

module.exports = {checkLinks};
