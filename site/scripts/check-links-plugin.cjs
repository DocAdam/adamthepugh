const {checkLinks} = require('./check-links.cjs');

module.exports = function checkLinksPlugin() {
  return {
    name: 'check-rendered-links',
    async postBuild({outDir, siteConfig}) {
      const result = checkLinks(outDir, siteConfig.url);
      if (result.errors.length) {
        throw new Error(`Rendered link check failed:\n${result.errors.join('\n')}`);
      }
      console.log(`Rendered link check passed: ${result.checked} internal links in ${result.pages} HTML pages.`);
    },
  };
};
