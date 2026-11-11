const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const siteDir = path.join(__dirname, '..');

test('keeps key navigation and image links descriptive', () => {
  const home = fs.readFileSync(path.join(siteDir, 'docs', 'intro.md'), 'utf8');
  const analytics = fs.readFileSync(path.join(siteDir, 'docs', 'case-studies', 'analytics-and-reporting.md'), 'utf8');

  assert.doesNotMatch(home, />Read the project<\/a>/);
  assert.match(home, />Read about Working Notes<\/a>/);
  assert.match(home, />Explore Good Doc Jobs<\/a>/);
  assert.match(home, />Read about the migration program<\/a>/);
  assert.match(home, />Read about the Euler documentation prototype<\/a>/);

  assert.doesNotMatch(analytics, />View full size\.<\/a>/);
  assert.match(analytics, />View the migration activity dashboard at full size\.<\/a>/);
  assert.match(analytics, />View the work-request progress dashboard at full size\.<\/a>/);
  assert.match(analytics, />View the migration status dashboard at full size\.<\/a>/);
  assert.match(analytics, />View the team-group progress dashboard at full size\.<\/a>/);
  assert.match(analytics, /### Dashboard summary/);
});

test('keeps Work headings in the generated table of contents and offsets the skip target', () => {
  const overview = fs.readFileSync(path.join(siteDir, 'docs', 'case-studies', 'overview.md'), 'utf8');
  const css = fs.readFileSync(path.join(siteDir, 'src', 'css', 'custom.css'), 'utf8');
  const skipLink = fs.readFileSync(path.join(siteDir, 'src', 'theme', 'SkipToContent', 'index.jsx'), 'utf8');

  assert.match(overview, /^## Products and publications \{#products-and-publications\}$/m);
  assert.match(overview, /^## Enterprise documentation systems \{#enterprise-documentation-systems\}$/m);
  assert.match(overview, /^## Prototypes \{#prototypes-and-contributions\}$/m);
  assert.doesNotMatch(overview, /<h2 id="(?:products-and-publications|enterprise-documentation-systems|prototypes-and-contributions)">/);
  assert.match(css, /#__docusaurus_skipToContent_fallback[\s\S]*scroll-margin-top:/);
  assert.match(skipLink, /element\.setAttribute\('tabindex', '-1'\)/);
  assert.doesNotMatch(skipLink, /removeAttribute\('tabindex'\)/);
});

test('keeps the Working Notes page concise without dropping its source links', () => {
  const page = fs.readFileSync(path.join(siteDir, 'docs', 'case-studies', 'working-notes.md'), 'utf8');

  assert.doesNotMatch(page, /^## What I publish$/m);
  assert.doesNotMatch(page, /^## Selected writing$/m);
  assert.equal((page.match(/everyone-needs-an-editor-grammarly/g) || []).length, 1);
  assert.equal((page.match(/everyone-needs-an-editor-unity/g) || []).length, 1);
  assert.match(page, /### Automated content audits/);
  assert.match(page, /### Job research and project writing/);
  assert.match(page, /just-a-spreadsheet/);
});
