const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {checkLinks} = require('./check-links.cjs');
const plugin = require('./check-links-plugin.cjs');

function fixture(t, files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-links-'));
  t.after(() => fs.rmSync(dir, {recursive: true, force: true}));
  for (const [name, text] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(dir, name)), {recursive: true});
    fs.writeFileSync(path.join(dir, name), text);
  }
  return dir;
}

test('rejects the original Work and Home card paths; accepts corrected paths', (t) => {
  const files = {
    'docs/case-studies/overview/index.html': '<a href="./euler-documentation-prototype">Euler</a>',
    'docs/intro/index.html': '<a href="./case-studies/overview">Work</a>',
    'docs/case-studies/euler-documentation-prototype/index.html': '<h1>Euler</h1>',
  };
  const dir = fixture(t, files);
  const result = checkLinks(dir, 'https://adamthepugh.com');
  assert.equal(result.errors.length, 2);
  assert.match(result.errors.join('\n'), /overview\/euler-documentation-prototype/);
  assert.match(result.errors.join('\n'), /intro\/case-studies\/overview/);
  fs.writeFileSync(path.join(dir, 'docs/case-studies/overview/index.html'), '<a href="/docs/case-studies/euler-documentation-prototype/">Euler</a>');
  fs.writeFileSync(path.join(dir, 'docs/intro/index.html'), '<a href="/docs/case-studies/overview/">Work</a>');
  assert.deepEqual(checkLinks(dir, 'https://adamthepugh.com').errors, []);
});

test('checks anchors and assets, including absolute same-site URLs and HTML entities', (t) => {
  const dir = fixture(t, {
    'index.html': '<a href="/docs/page#details">A</a><a href="/docs/page/#a&amp;b">B</a><a href="https://adamthepugh.com/resume.pdf">PDF</a><a href="https://example.com/unavailable">External</a><a href="mailto:a@example.com">Mail</a>',
    'docs/page/index.html': '<h2 id="details">Details</h2><h2 id="a&amp;b">Other</h2><a href="#details">Self</a>',
    'resume.pdf': 'fixture',
  });
  assert.deepEqual(checkLinks(dir, 'https://adamthepugh.com').errors, []);
  fs.writeFileSync(path.join(dir, 'index.html'), '<a href="/docs/page/#missing">Bad anchor</a><a href="/missing.pdf">Bad file</a>');
  const result = checkLinks(dir, 'https://adamthepugh.com');
  assert.equal(result.errors.length, 2);
  assert.match(result.errors[0], /missing anchor/);
  assert.match(result.errors[1], /missing destination/);
});

test('build hook rejects broken output and accepts valid output', async (t) => {
  const outDir = fixture(t, {'index.html': '<a href="/missing/">Broken</a>'});
  const args = {outDir, siteConfig: {url: 'https://adamthepugh.com'}};
  await assert.rejects(plugin().postBuild(args), /Rendered link check failed/);
  fs.writeFileSync(path.join(outDir, 'index.html'), '<a href="/">Home</a>');
  await assert.doesNotReject(plugin().postBuild(args));
});

test('rejects an empty output directory', (t) => {
  assert.throws(() => checkLinks(fixture(t, {}), 'https://adamthepugh.com'), /No HTML pages/);
});
