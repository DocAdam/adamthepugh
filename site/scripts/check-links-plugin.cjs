const {checkLinks} = require('./check-links.cjs');
const {checkOverviews} = require('./check-overviews.cjs');
const path = require('node:path');

module.exports = function checkLinksPlugin(context) {
  return {
    name: 'check-rendered-links',
    async postBuild({outDir, siteConfig}) {
      const result = checkLinks(outDir, siteConfig.url);
      if (result.errors.length) {
        throw new Error(`Rendered link check failed:\n${result.errors.join('\n')}`);
      }
      console.log(`Rendered link check passed: ${result.checked} internal links in ${result.pages} HTML pages.`);
      if (context) {
        const overviews = checkOverviews({
          docsDir: path.join(context.siteDir, 'docs'),
          outDir,
          sidebars: require(path.join(context.siteDir, 'sidebars.js')),
          siteUrl: siteConfig.url,
        });
        if (overviews.errors.length) throw new Error(`Overview check failed:\n${overviews.errors.join('\n\n')}`);
        console.log(`Overview check passed: ${overviews.checked} overview pages; ${overviews.skipped.length} redirect overview pages excluded.`);
      }
    },
  };
};
