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

test('publishes selected Working Notes images from optimized local assets', () => {
  const siteDir = path.join(__dirname, '..');
  const workingNotes = fs.readFileSync(path.join(siteDir, 'docs', 'case-studies', 'working-notes.md'), 'utf8');
  const goodDocJobs = fs.readFileSync(path.join(siteDir, 'docs', 'case-studies', 'good-doc-jobs.md'), 'utf8');
  const images = new Map([
    ['everyone-needs-an-editor.png', workingNotes],
    ['five-recent-documentation-jobs.png', workingNotes],
    ['good-doc-jobs-weekly-metrics.png', goodDocJobs],
  ]);

  for (const [image, page] of images) {
    const publicPath = `/img/working-notes/${image}`;
    const assetPath = path.join(siteDir, 'static', publicPath);
    assert.match(page, new RegExp(publicPath.replaceAll('/', '\\/')));
    assert.ok(fs.existsSync(assetPath), `${publicPath} must exist`);
    assert.ok(fs.statSync(assetPath).size < 1024 * 1024, `${publicPath} must remain smaller than 1 MB`);
  }

  assert.doesNotMatch(workingNotes, /\/Users\/adampugh\/Downloads\/substack/);
  assert.doesNotMatch(goodDocJobs, /\/Users\/adampugh\/Downloads\/substack/);
});

test('separates Working Notes, Good Doc Jobs, and GitHub activity on the Work page', () => {
  const siteDir = path.join(__dirname, '..');
  const overview = fs.readFileSync(path.join(siteDir, 'docs', 'case-studies', 'overview.md'), 'utf8');
  const activity = fs.readFileSync(path.join(siteDir, 'src', 'components', 'GitHubActivity.jsx'), 'utf8');
  const activeSources = [
    ...sourceFiles(path.join(siteDir, 'docs')),
    path.join(siteDir, 'static', 'llms.txt'),
    path.join(siteDir, 'sidebars.js'),
  ];

  assert.match(overview, /href="\/work\/working-notes\/"/);
  assert.match(overview, /href="\/work\/good-doc-jobs\/"/);
  assert.match(overview, /<GitHubActivity \/>/);
  assert.doesNotMatch(overview, /## Selected writing|### Open-source contribution/);
  assert.match(activity, /api\.github\.com\/users\/DocAdam\/events\/public/);
  assert.match(activity, /View current activity on GitHub/);

  for (const file of activeSources) {
    assert.doesNotMatch(
      fs.readFileSync(file, 'utf8'),
      /\/work\/working-notes-good-doc-jobs\//,
      `${path.relative(siteDir, file)} must link to the separate project pages`,
    );
  }
});

test('keeps active portfolio copy direct and work-focused', () => {
  const siteDir = path.join(__dirname, '..');
  const files = [
    ...sourceFiles(path.join(siteDir, 'docs')),
    path.join(siteDir, 'static', 'llms.txt'),
    path.join(siteDir, '..', 'README.md'),
  ];
  const weakPhrases = [
    /\bpractitioner\b/i,
    /evidence boundary/i,
    /evidence limits/i,
    /not complete quality reviews/i,
    /does not state the current size/i,
    /does not guarantee/i,
    /feed changes do not prove/i,
    /Euler did not commission/i,
    /result and limits/i,
  ];

  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');
    for (const phrase of weakPhrases) {
      assert.doesNotMatch(source, phrase, `${path.relative(siteDir, file)} must describe the work directly`);
    }
  }
});

test('labels the public resume PDF consistently', () => {
  const siteDir = path.join(__dirname, '..');
  const config = fs.readFileSync(path.join(siteDir, 'docusaurus.config.js'), 'utf8');
  const intro = fs.readFileSync(path.join(siteDir, 'docs', 'intro.md'), 'utf8');
  const experience = fs.readFileSync(path.join(siteDir, 'docs', 'experience', 'overview.md'), 'utf8');
  const llms = fs.readFileSync(path.join(siteDir, 'static', 'llms.txt'), 'utf8');
  const publicCopy = [config, intro, experience, llms].join('\n');

  assert.equal((config.match(/>Resume \(PDF\)<\/a>/g) || []).length, 1);
  assert.match(intro, /href="\/adam-pugh-resume\.pdf">Resume \(PDF\)<\/a>/);
  assert.match(experience, /href="\/adam-pugh-resume\.pdf">Resume \(PDF\)<\/a>/);
  assert.match(llms, /\[Resume \(PDF\)\]\(https:\/\/adamthepugh\.com\/adam-pugh-resume\.pdf\)/);
  assert.doesNotMatch(publicCopy, /Download (?:the general )?résumé|>Résumé<\/a>|Résumé on LinkedIn/);
});

test('keeps the footer to copyright and primary profiles', () => {
  const config = fs.readFileSync(path.join(__dirname, '..', 'docusaurus.config.js'), 'utf8');

  assert.match(config, /© \$\{new Date\(\)\.getFullYear\(\)\} Adam Pugh/);
  assert.match(config, /href="https:\/\/www\.linkedin\.com\/in\/adampugh\/">LinkedIn<\/a>/);
  assert.match(config, /href="https:\/\/github\.com\/DocAdam">GitHub<\/a>/);
  assert.match(config, /href="https:\/\/docadam\.substack\.com\/">Substack<\/a>/);
  assert.doesNotMatch(config, /footer__brand-tagline|title: 'Explore'|title: 'Elsewhere'/);
});

test('publishes responsive process visuals for enterprise work', () => {
  const siteDir = path.join(__dirname, '..');
  const visuals = [
    {
      page: 'analytics-and-reporting.md',
      desktop: 'analytics-reporting-system.svg',
      mobile: 'analytics-reporting-system-mobile.svg',
      pillCount: 5,
    },
    {
      page: 'migrations-and-ia.md',
      desktop: 'migration-content-transformation.svg',
      mobile: 'migration-content-transformation-mobile.svg',
      pillCount: 4,
    },
    {
      page: 'documentation-tooling-and-automation.md',
      desktop: 'tooling-validation-loop.svg',
      mobile: 'tooling-validation-loop-mobile.svg',
      pillCount: 4,
    },
  ];

  for (const { page, desktop, mobile, pillCount } of visuals) {
    const source = fs.readFileSync(path.join(siteDir, 'docs', 'case-studies', page), 'utf8');
    assert.match(source, new RegExp(`/img/process/${desktop}`));
    assert.match(source, new RegExp(`/img/process/${mobile}`));
    assert.match(source, /<figure className="process-visual">/);

    for (const image of [desktop, mobile]) {
      const asset = fs.readFileSync(path.join(siteDir, 'static', 'img', 'process', image), 'utf8');
      assert.match(asset, /^<svg /);
      assert.match(asset, /<title id="title">/);
      assert.match(asset, /<desc id="desc">/);
      assert.equal((asset.match(/fill="#26334a"/g) || []).length, pillCount, `${image} must use one pill for each evidence item`);
    }
  }

  const docs = sourceFiles(path.join(siteDir, 'docs')).map((file) => fs.readFileSync(file, 'utf8')).join('\n');
  const css = fs.readFileSync(path.join(siteDir, 'src', 'css', 'custom.css'), 'utf8');
  assert.doesNotMatch(docs, /system-flow/);
  assert.doesNotMatch(css, /\.system-flow/);
});

test('keeps enterprise page names concise and consistent', () => {
  const siteDir = path.join(__dirname, '..');
  const pages = new Map([
    ['migrations-and-ia.md', 'Migrations and information architecture'],
    ['analytics-and-reporting.md', 'Analytics and reporting'],
    ['documentation-tooling-and-automation.md', 'Tooling and automation'],
  ]);

  for (const [file, title] of pages) {
    const source = fs.readFileSync(path.join(siteDir, 'docs', 'case-studies', file), 'utf8');
    assert.match(source, new RegExp(`^title: "${title}"$`, 'm'));
    assert.match(source, new RegExp(`^# ${title}$`, 'm'));
  }

  const activeSources = [
    ...sourceFiles(path.join(siteDir, 'docs')),
    path.join(siteDir, 'static', 'llms.txt'),
    path.join(siteDir, '..', 'README.md'),
  ];
  const repeatedNames = [
    'Documentation migrations and information architecture',
    'Documentation analytics and reporting',
    'Documentation tooling and automation',
  ];

  for (const file of activeSources) {
    const source = fs.readFileSync(file, 'utf8');
    for (const name of repeatedNames) {
      assert.doesNotMatch(source, new RegExp(name), `${path.relative(siteDir, file)} must use the concise enterprise page name`);
    }
  }

  const overview = fs.readFileSync(path.join(siteDir, 'docs', 'case-studies', 'overview.md'), 'utf8');
  assert.doesNotMatch(overview, /status-label">Enterprise documentation system</);
});
