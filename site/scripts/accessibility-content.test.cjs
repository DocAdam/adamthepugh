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
  const config = fs.readFileSync(path.join(siteDir, 'docusaurus.config.js'), 'utf8');
  const llms = fs.readFileSync(path.join(siteDir, 'static', 'llms.txt'), 'utf8');
  const title = 'Adam Pugh | Technical Writing, Documentation Systems &amp; Operations';
  const description = 'Technical writing, documentation engineering, and docs leadership—building clear content and the systems that keep it accurate.';

  assert.equal((home.match(new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length, 3);
  assert.equal((home.match(new RegExp(description.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length, 5);
  assert.match(home, new RegExp(`<meta property="og:title" content="${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}" \\/>`));
  assert.match(home, /<meta property="og:image" content="https:\/\/adamthepugh\.com\/img\/social-card\.png" \/>/);
  assert.match(home, /<meta property="og:image:alt" content="Adam Pugh\. Technical Writing, Documentation Systems &amp; Operations\." \/>/);
  assert.match(home, /<meta property="og:url" content="https:\/\/adamthepugh\.com\/" \/>/);
  assert.match(home, /<meta name="twitter:title"/);
  assert.match(home, /<meta name="twitter:description"/);
  assert.match(home, /<meta name="twitter:image:alt"/);
  assert.match(home, /jobTitle: 'Technical Writing and Documentation Operations Leader'/);
  assert.match(config, new RegExp(`tagline: '${description.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`));
  assert.match(llms, new RegExp(`^> ${description.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'm'));
  assert.match(llms, /including 13 years of direct people management/);
  assert.doesNotMatch(`${config}\n${home}\n${llms}`, /Senior Documentation Engineer/);
  assert.doesNotMatch(llms, /about 13 years/i);
  assert.match(home, /<div aria-hidden="true">\s*<span id="the-working-model"><\/span>/);
});

test('keeps factual Meta role references unchanged', () => {
  const experience = fs.readFileSync(path.join(siteDir, 'docs', 'experience', 'overview.md'), 'utf8');
  const tooling = fs.readFileSync(path.join(siteDir, 'docs', 'case-studies', 'documentation-tooling-and-automation.md'), 'utf8');

  assert.match(experience, /^### Senior Documentation Engineer · July 2023–July 2026$/m);
  assert.match(tooling, /^\*\*Context:\*\* Meta, Senior Documentation Engineer, 2025–2026<br \/>$/m);
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

test('keeps the Experience structure, evidence, and Work links stable', () => {
  const experience = fs.readFileSync(path.join(siteDir, 'docs', 'experience', 'overview.md'), 'utf8');
  const css = fs.readFileSync(path.join(siteDir, 'src', 'css', 'custom.css'), 'utf8');
  const legacyIds = [
    'scale-at-a-glance',
    'cross-functional-documentation-engineering',
    'documentation-tooling-and-workflow-automation',
    'analytics-and-reporting',
    'documentation-systems-and-structure',
    'where-i-have-led',
    'what-i-try-to-create',
    'leadership',
    'senior-documentation-engineer--2023present',
    'documentation-manager--20222023',
    'jack-henry',
    'mentoring-and-team-development',
    'independent-work',
    'what-the-work-requires',
  ];

  assert.match(experience, /with 13 years of direct people management/);
  assert.doesNotMatch(experience, /about 13 years/i);
  assert.match(experience, /^## Core capabilities$/m);
  assert.match(experience, /className="work-grid experience-capabilities"/);
  assert.equal((experience.match(/className="work-card"/g) || []).length, 3);
  assert.match(css, /\.experience-capabilities\s*\{[\s\S]*grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);

  for (const id of legacyIds) {
    assert.equal((experience.match(new RegExp(`id="${id}"`, 'g')) || []).length, 1, `${id} must remain unique`);
  }
  assert.equal((experience.match(/<div aria-hidden="true">/g) || []).length, 5);

  assert.match(experience, /^### Senior Documentation Engineer · July 2023–July 2026$/m);
  assert.match(experience, /^### Documentation Engineering Manager · March 2022–June 2023$/m);
  assert.match(experience, /^### Leadership phase · 2010–2022$/m);
  assert.match(experience, /\*\*Senior Manager of Technical Writing · 2021–2022\.\*\*/);
  assert.match(experience, /\*\*Manager of Technical Writing · 2010–2021\.\*\*/);
  assert.match(experience, /^### Foundation phase · 2005–2010$/m);
  assert.match(experience, /\*\*Technical Writer, Advanced · 2007–2010\.\*\*/);
  assert.match(experience, /\*\*Technical Writer · 2005–2007\.\*\*/);
  assert.match(experience, /^## Independent venture: Vinyl Junction$/m);

  assert.match(experience, /more than 400 internal Enterprise Engineering products/);
  assert.match(experience, /101 product-documentation wikis across seven team groups/);
  assert.match(experience, /1,157 source pages into 469 destination pages/);
  assert.match(experience, /16-person documentation organization of 15 writers and one manager/);
  assert.match(experience, /technical writing team to 14 employees/);
  assert.match(experience, /more than 6,000 bank reports/);
  assert.match(experience, /more than \$400,000 in cumulative revenue/);
  assert.match(experience, /approximately 837,000 shop visits/);
  assert.match(experience, /more than 1\.1 million listing views/);

  assert.match(experience, /\]\(\/work\/documentation-tooling\/\)/);
  assert.match(experience, /\]\(\/work\/documentation-analytics\/\)/);
  assert.equal((experience.match(/\]\(\/work\/documentation-migrations\/\)/g) || []).length, 2);
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
