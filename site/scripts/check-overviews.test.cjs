const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {checkOverviews} = require('./check-overviews.cjs');
const plugin = require('./check-links-plugin.cjs');

function fixture(t, html, extra = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-overviews-'));
  t.after(() => fs.rmSync(root, {recursive: true, force: true}));
  const files = {
    'docs/work/overview.md': '# Work',
    'docs/work/first.md': '# First',
    'docs/work/second.md': '# Second',
    'build/docs/work/overview/index.html': html,
    'build/docs/work/first/index.html': '<h1>First</h1>',
    'build/docs/work/second/index.html': '<h1>Second</h1>',
    ...extra,
  };
  for (const [name, text] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, name)), {recursive: true});
    fs.writeFileSync(path.join(root, name), text);
  }
  const sidebars = {main: [{type: 'category', label: 'Work', items: ['work/overview', {type: 'doc', id: 'work/first'}, 'work/second']}]};
  fs.writeFileSync(path.join(root, 'sidebars.js'), `module.exports = ${JSON.stringify(sidebars)}`);
  return {root, docsDir: path.join(root, 'docs'), outDir: path.join(root, 'build'), sidebars, siteUrl: 'https://example.com'};
}

function index(ids) {
  return `<div data-section-index>${ids.map((id) => `<a href="/docs/work/${id}/">${id}</a>`).join('')}</div>`;
}

test('accepts the sidebar order and ignores navigation and contextual links', (t) => {
  const args = fixture(t, '<nav><a href="/docs/work/second/">Second</a></nav>' + index(['first', 'second']) + '<a href="/docs/work/first/">Read first</a>');
  assert.deepEqual(checkOverviews(args).errors, []);
});

test('detects an omitted card even when that page appears elsewhere', (t) => {
  const args = fixture(t, index(['first']) + '<p><a href="/docs/work/second/">Second</a></p>');
  const errors = checkOverviews(args).errors;
  assert.equal(errors.length, 1);
  assert.match(errors[0], /Proposed update/);
  assert.match(errors[0], /\[second\]\(\/docs\/work\/second\/\)/);
});

test('rejects reversed, repeated, and absent section indexes', (t) => {
  for (const html of [index(['second', 'first']), index(['first', 'second', 'first']), '<nav>Only sidebar links</nav>', index(['first', 'second']) + index(['first', 'second'])]) {
    assert.equal(checkOverviews(fixture(t, html)).errors.length, 1);
  }
});

test('reports new content outside the sidebar instead of silently excluding it', (t) => {
  const args = fixture(t, index(['first', 'second']), {'docs/work/third.md': '# Third'});
  assert.match(checkOverviews(args).errors.join('\n'), /pages missing from the sidebar: work\/third/);
});

test('excludes redirect pages and redirect overviews, and permits sections without child pages', (t) => {
  const args = fixture(t, index(['first', 'second']), {
    'docs/work/old.md': 'import {Redirect} from "@docusaurus/router";\n<Redirect to="/docs/work/overview" />',
    'docs/experience/overview.md': '<Redirect to="/docs/experience/history" />',
    'docs/writing/overview.md': '# Writing',
    'build/docs/writing/overview/index.html': '<h1>Writing</h1>',
  });
  const result = checkOverviews(args);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.skipped, ['experience/overview']);
  assert.equal(result.checked, 2);
});

test('uses changed sidebar order as the authority', (t) => {
  const args = fixture(t, index(['first', 'second']));
  args.sidebars.main[0].items = ['work/overview', 'work/second', 'work/first'];
  assert.match(checkOverviews(args).errors[0], /Expected: work\/second, work\/first/);
});

test('build hook fails on an incomplete overview with otherwise valid links', async (t) => {
  const args = fixture(t, index(['first']));
  await assert.rejects(plugin({siteDir: args.root}).postBuild({outDir: args.outDir, siteConfig: {url: args.siteUrl}}), /Overview check failed/);
});
