const fs = require('node:fs');
const path = require('node:path');
const {parse} = require('parse5');

function docOrder(items) {
  return items.flatMap((item) => {
    if (typeof item === 'string') return [item];
    if (item.type === 'doc') return [item.id];
    if (item.type === 'category') return docOrder(item.items);
    if (item.type === 'link' || item.type === 'html') return [];
    throw new Error(`Unsupported sidebar item: ${item.type}. Update the overview checker before publishing.`);
  });
}

function docFiles(dir) {
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? docFiles(file) : /\.mdx?$/.test(file) ? [file] : [];
  });
}

function indexLinks(html) {
  const groups = [];
  function visit(node, links) {
    const attrs = Object.fromEntries((node.attrs || []).map(({name, value}) => [name, value]));
    if (Object.hasOwn(attrs, 'data-section-index')) {
      links = [];
      groups.push(links);
    }
    if (links && node.tagName === 'a' && attrs.href !== undefined) links.push(attrs.href);
    for (const child of node.childNodes || []) visit(child, links);
  }
  visit(parse(html));
  return groups;
}

function checkOverviews({docsDir, outDir, sidebars, siteUrl}) {
  const errors = [];
  const skipped = [];
  let checked = 0;
  const docs = docFiles(docsDir).map((file) => ({
    file,
    id: path.relative(docsDir, file).split(path.sep).join('/').replace(/\.mdx?$/, ''),
    redirect: /<Redirect\s/.test(fs.readFileSync(file, 'utf8')),
  }));
  const order = Object.values(sidebars).flatMap(docOrder);
  for (const overview of docs.filter((doc) => path.posix.basename(doc.id) === 'overview')) {
    if (overview.redirect) {
      skipped.push(overview.id);
      continue;
    }
    checked++;
    const section = path.posix.dirname(overview.id);
    const siblings = docs.filter((doc) => doc !== overview && !doc.redirect && path.posix.dirname(doc.id) === section);
    const ids = new Set(siblings.map((doc) => doc.id));
    const expected = order.filter((id) => ids.has(id));
    const unlisted = siblings.filter((doc) => !order.includes(doc.id));
    if (unlisted.length) {
      errors.push(`${overview.id}: pages missing from the sidebar: ${unlisted.map((doc) => doc.id).join(', ')}. Proposed update: add them to sidebars.js in the intended published order, then update the section index.`);
    }
    const file = path.join(outDir, 'docs', overview.id, 'index.html');
    if (!fs.existsSync(file)) {
      errors.push(`${overview.id}: generated overview page is missing: ${file}`);
      continue;
    }
    const groups = indexLinks(fs.readFileSync(file, 'utf8'));
    if (!expected.length && !groups.length) continue;
    const base = new URL(`/docs/${overview.id}/`, siteUrl);
    const expectedUrls = expected.map((id) => new URL(`/docs/${id}/`, siteUrl).href);
    const actual = (groups[0] || []).map((href) => {
      const url = new URL(href, base);
      url.hash = '';
      url.search = '';
      url.pathname = url.pathname.replace(/\/$/, '') + '/';
      return url.href;
    });
    if (groups.length !== 1 || JSON.stringify(actual) !== JSON.stringify(expectedUrls)) {
      const proposal = expected.map((id) => `- [${id.split('/').at(-1)}](/docs/${id}/)`).join('\n');
      errors.push(`${overview.id}: section index must contain each sidebar page once, in published order. Found ${groups.length} index blocks.\nExpected: ${expected.join(', ')}\nActual: ${actual.join(', ')}\nProposed update inside one <div data-section-index>:\n${proposal}`);
    }
  }
  return {checked, skipped, errors};
}

module.exports = {checkOverviews};
