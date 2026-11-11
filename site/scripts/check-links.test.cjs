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

function sourceFiles(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(file) : [file];
  });
}

test('rejects broken relative card paths and accepts clean canonical paths', (t) => {
  const files = {
    'work/index.html': '<a href="./missing-euler">Euler</a>',
    'index.html': '<a href="./missing-work">Work</a>',
    'work/euler-documentation-prototype/index.html': '<h1>Euler</h1>',
  };
  const dir = fixture(t, files);
  const result = checkLinks(dir, 'https://adamthepugh.com');
  assert.equal(result.errors.length, 2);
  assert.match(result.errors.join('\n'), /work\/missing-euler/);
  assert.match(result.errors.join('\n'), /missing-work/);
  fs.writeFileSync(path.join(dir, 'work/index.html'), '<a href="/work/euler-documentation-prototype/">Euler</a>');
  fs.writeFileSync(path.join(dir, 'index.html'), '<a href="/work/">Work</a>');
  assert.deepEqual(checkLinks(dir, 'https://adamthepugh.com').errors, []);
});

test('rejects canonical links to redirects and rejects redirect chains', (t) => {
  const dir = fixture(t, {
    'index.html': '<a href="/old/">Old route</a>',
    'old/index.html': '<meta http-equiv="refresh" content="0; url=/middle/">',
    'middle/index.html': '<meta http-equiv="refresh" content="0; url=/new/">',
    'new/index.html': '<h1>New</h1>',
  });
  const result = checkLinks(dir, 'https://adamthepugh.com');
  assert.match(result.errors.join('\n'), /links to redirect/);
  assert.match(result.errors.join('\n'), /redirect chain/);

  fs.writeFileSync(path.join(dir, 'index.html'), '<a href="/new/">New route</a>');
  fs.writeFileSync(path.join(dir, 'old/index.html'), '<meta http-equiv="refresh" content="0; url=/new/">');
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

test('keeps the Euler html compatibility redirect aligned with the current route', () => {
  const redirect = fs.readFileSync(path.join(__dirname, '..', 'static', 'docs', 'case-studies', 'euler-documentation-prototype.html'), 'utf8');
  const target = '/work/euler-documentation-prototype/';
  assert.match(redirect, new RegExp(`http-equiv="refresh" content="0; url=${target}"`));
  assert.match(redirect, new RegExp(`rel="canonical" href="https://adamthepugh.com${target}"`));
  assert.match(redirect, new RegExp(`window.location.replace\\('${target.replaceAll('/', '\\/')}`));
  assert.match(redirect, new RegExp(`href="${target}"`));
});

test('keeps canonical source free of legacy case-study URLs', () => {
  const siteDir = path.join(__dirname, '..');
  const files = [
    ...sourceFiles(path.join(siteDir, 'docs')),
    path.join(siteDir, 'static', 'llms.txt'),
    path.join(siteDir, 'docusaurus.config.js'),
  ];
  for (const file of files) {
    assert.doesNotMatch(
      fs.readFileSync(file, 'utf8'),
      /(?:https:\/\/adamthepugh\.com)?\/docs\/case-studies(?:\/|\b)/,
      `${path.relative(siteDir, file)} must link to its final /work/ route`,
    );
  }
});

test('publishes the documentation analytics gallery from local static assets', () => {
  const siteDir = path.join(__dirname, '..');
  const page = fs.readFileSync(path.join(siteDir, 'docs', 'case-studies', 'analytics-and-reporting.md'), 'utf8');
  const images = [
    'ep-docs-migration-metrics.png',
    'ep-docs-work-progress-tracker.png',
    'ep-documentation-migration-metrics.png',
    'team-group-migrations.png',
  ];

  for (const image of images) {
    const publicPath = `/img/documentation-analytics/${image}`;
    assert.match(page, new RegExp(publicPath.replaceAll('/', '\\/')));
    assert.ok(fs.existsSync(path.join(siteDir, 'static', publicPath)), `${publicPath} must exist`);
  }

  assert.doesNotMatch(page, /user-images\.githubusercontent\.com|public\.tableau\.com/);
});
