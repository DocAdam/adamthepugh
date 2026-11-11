const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {checkBuiltRoutes} = require('./check-built-routes.cjs');
const {canonicalRoutes, redirectMap, staticRedirectMap} = require('../route-contract.cjs');

const siteUrl = 'https://adamthepugh.com';

function routeFile(root, route) {
  const relative = route.replace(/^\//, '');
  return route.endsWith('.html')
    ? path.join(root, relative)
    : path.join(root, relative, 'index.html');
}

function write(file, text) {
  fs.mkdirSync(path.dirname(file), {recursive: true});
  fs.writeFileSync(file, text);
}

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-routes-'));
  t.after(() => fs.rmSync(root, {recursive: true, force: true}));
  for (const route of canonicalRoutes) write(routeFile(root, route), `<h1>${route}</h1>`);
  for (const [source, target] of new Map([...redirectMap, ...staticRedirectMap])) {
    write(routeFile(root, source), `<meta http-equiv="refresh" content="0; url=${target}">`);
  }
  const urls = canonicalRoutes.map((route) => `<url><loc>${new URL(route, siteUrl).href}</loc></url>`).join('');
  write(path.join(root, 'sitemap.xml'), `<urlset>${urls}</urlset>`);
  return root;
}

test('accepts the exact canonical sitemap and direct legacy redirects', (t) => {
  const outDir = fixture(t);
  const result = checkBuiltRoutes({outDir, siteUrl});
  assert.deepEqual(result.errors, []);
  assert.equal(result.canonical, 10);
  assert.equal(result.redirects, redirectMap.size + staticRedirectMap.size);
});

test('rejects extra legacy URLs in the sitemap', (t) => {
  const outDir = fixture(t);
  fs.appendFileSync(path.join(outDir, 'sitemap.xml'), '<url><loc>https://adamthepugh.com/docs/about/</loc></url>');
  assert.match(checkBuiltRoutes({outDir, siteUrl}).errors.join('\n'), /Sitemap must contain only/);
});

test('rejects a redirect chain and a missing canonical page', (t) => {
  const outDir = fixture(t);
  const [firstSource] = redirectMap.keys();
  const secondSource = [...redirectMap.keys()][1];
  write(routeFile(outDir, firstSource), `<meta http-equiv="refresh" content="0; url=${secondSource}">`);
  fs.rmSync(routeFile(outDir, canonicalRoutes[1]));
  const errors = checkBuiltRoutes({outDir, siteUrl}).errors.join('\n');
  assert.match(errors, /redirect chain/);
  assert.match(errors, /canonical page is missing/);
});
