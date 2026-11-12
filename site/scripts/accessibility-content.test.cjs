const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const siteDir = path.join(__dirname, '..');

function contentFiles(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return contentFiles(entryPath);
    return /\.(?:md|mdx|js|jsx|ts|tsx)$/.test(entry.name) ? [entryPath] : [];
  });
}

test('keeps key navigation and image links consistent', () => {
  const home = fs.readFileSync(path.join(siteDir, 'docs', 'intro.md'), 'utf8');
  const analytics = fs.readFileSync(path.join(siteDir, 'docs', 'case-studies', 'analytics-and-reporting.md'), 'utf8');

  assert.doesNotMatch(home, />Read the project<\/a>/);
  assert.equal((home.match(/href="\/work\/[^"]+\/">Overview<\/a>/g) || []).length, 4);
  assert.match(home, /public Model Context Protocol \(MCP\) source material/);

  assert.doesNotMatch(analytics, />View full size\.<\/a>/);
  assert.match(analytics, />View the migration activity dashboard at full size\.<\/a>/);
  assert.match(analytics, />View the work-request progress dashboard at full size\.<\/a>/);
  assert.match(analytics, />View the migration status dashboard at full size\.<\/a>/);
  assert.match(analytics, />View the team-group progress dashboard at full size\.<\/a>/);
  assert.match(analytics, /### Dashboard summary/);
});

test('keeps Featured work order and external-link behavior stable', () => {
  const home = fs.readFileSync(path.join(siteDir, 'docs', 'intro.md'), 'utf8');
  const featuredNames = [
    'Working Notes',
    'Good Doc Jobs',
    'Migrations and information architecture',
    'Euler documentation prototype',
  ];

  for (let index = 1; index < featuredNames.length; index += 1) {
    assert.ok(home.indexOf(`<h3>${featuredNames[index - 1]}</h3>`) < home.indexOf(`<h3>${featuredNames[index]}</h3>`));
  }

  const anchors = [...home.matchAll(/<a\b([^>]*href="([^"]+)"[^>]*)>([^<]+)<\/a>/g)];
  for (const [, attributes, href, label] of anchors) {
    if (/^https?:\/\//.test(href)) {
      assert.match(attributes, /target="_blank"/);
      assert.match(attributes, /rel="noopener noreferrer"/);
      assert.match(label, /↗$/);
    } else {
      assert.doesNotMatch(attributes, /target=|rel=/);
      assert.doesNotMatch(label, /↗/);
    }
  }
  assert.doesNotMatch(home, /case study/i);
});

test('keeps home page metadata aligned with the hero', () => {
  const home = fs.readFileSync(path.join(siteDir, 'docs', 'intro.md'), 'utf8');
  const description = 'I make complex product documentation and knowledge systems easier to use, govern, and maintain.';

  assert.equal((home.match(new RegExp(description.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length, 4);
  assert.match(home, /<meta property="og:title" content="Adam Pugh \| Senior Documentation Engineer" \/>/);
  assert.match(home, /<meta property="og:image" content="https:\/\/adamthepugh\.com\/img\/social-card\.png" \/>/);
  assert.match(home, /<meta property="og:url" content="https:\/\/adamthepugh\.com\/" \/>/);
  assert.match(home, /<div aria-hidden="true">\s*<span id="the-working-model"><\/span>/);
});

test('keeps internal and external links consistent outside the home page', () => {
  const files = [
    ...contentFiles(path.join(siteDir, 'docs')),
    ...contentFiles(path.join(siteDir, 'src')),
  ].filter((file) => file !== path.join(siteDir, 'docs', 'intro.md'));

  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');
    const relativeFile = path.relative(siteDir, file);

    assert.doesNotMatch(source, /case stud(?:y|ies)/i, `${relativeFile} must not use the excluded term`);
    assert.doesNotMatch(source, /\[[^\]]+\]\(https?:\/\//, `${relativeFile} must use explicit HTML for external links`);

    for (const match of source.matchAll(/<a\b([^>]*)href="([^"]+)"([^>]*)>([\s\S]*?)<\/a>/g)) {
      const [, beforeHref, href, afterHref, content] = match;
      const attributes = `${beforeHref} ${afterHref}`;
      const label = content.replace(/<[^>]+>/g, '').trim();
      const external = /^https?:\/\//.test(href) && !/^https?:\/\/(?:www\.)?adamthepugh\.com(?:\/|$)/.test(href);

      if (external) {
        assert.match(attributes, /target="_blank"/, `${relativeFile}: ${href} must open in a new tab`);
        assert.match(attributes, /rel="noopener noreferrer"/, `${relativeFile}: ${href} must use a safe rel value`);
        assert.match(label, /↗$/, `${relativeFile}: ${href} must show the external-link indicator`);
      } else if (/^(?:\/|#)/.test(href)) {
        assert.doesNotMatch(attributes, /target="_blank"/, `${relativeFile}: ${href} must open in the same tab`);
        assert.doesNotMatch(label, /↗/, `${relativeFile}: ${href} must not show the external-link indicator`);
      }
    }

    for (const match of source.matchAll(/\[([^\]]+)\]\(((?:\/|#)[^)]+)\)/g)) {
      assert.doesNotMatch(match[1], /↗/, `${relativeFile}: ${match[2]} must not show the external-link indicator`);
    }
  }

  const activity = fs.readFileSync(path.join(siteDir, 'src', 'components', 'GitHubActivity.jsx'), 'utf8');
  assert.match(activity, /href=\{eventUrl\(event\)\} target="_blank" rel="noopener noreferrer"/);
  assert.match(activity, /href=\{PROFILE_URL\} target="_blank" rel="noopener noreferrer"/);
  assert.equal((activity.match(/<span aria-hidden="true">↗<\/span>/g) || []).length, 2);
});

test('keeps navigation and footer link behavior consistent', () => {
  const config = require(path.join(siteDir, 'docusaurus.config.js'));
  const externalNavbarItems = config.themeConfig.navbar.items.filter((item) => /^https?:\/\//.test(item.href || ''));

  for (const item of externalNavbarItems) {
    assert.equal(item.target, '_blank', `${item.label} must open in a new tab`);
    assert.equal(item.rel, 'noopener noreferrer', `${item.label} must use a safe rel value`);
  }

  for (const match of config.themeConfig.footer.copyright.matchAll(/<a\b([^>]*)href="(https?:\/\/[^"]+)"([^>]*)>/g)) {
    const attributes = `${match[1]} ${match[3]}`;
    assert.match(attributes, /target="_blank"/, `${match[2]} must open in a new tab`);
    assert.match(attributes, /rel="noopener noreferrer"/, `${match[2]} must use a safe rel value`);
  }
});

test('keeps Work headings in the generated table of contents and offsets the skip target', () => {
  const overview = fs.readFileSync(path.join(siteDir, 'docs', 'case-studies', 'overview.md'), 'utf8');
  const css = fs.readFileSync(path.join(siteDir, 'src', 'css', 'custom.css'), 'utf8');
  const skipLink = fs.readFileSync(path.join(siteDir, 'src', 'theme', 'SkipToContent', 'index.jsx'), 'utf8');

  assert.match(overview, /^## Products and publications \{#products-and-publications\}$/m);
  assert.match(overview, /^## Enterprise documentation systems \{#enterprise-documentation-systems\}$/m);
  assert.match(overview, /^## Prototypes \{#prototypes-and-contributions\}$/m);
  assert.doesNotMatch(overview, /<h2 id="(?:products-and-publications|enterprise-documentation-systems|prototypes-and-contributions)">/);
  assert.doesNotMatch(overview, /^  <span id=/m, 'legacy anchors must not create rows in the Work page grid');
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
