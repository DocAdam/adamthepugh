// @ts-check
const {redirectGroups} = require('./route-contract.cjs');

const config = {
  title: 'Adam Pugh',
  tagline: 'Technical writing, documentation engineering, and docs leadership, building clear content and the systems that keep it accurate.',
  favicon: 'img/logo.svg',

  future: {
    v4: true,
  },

  url: 'https://adamthepugh.com',
  baseUrl: '/',
  // GitHub Pages serves directory indexes reliably; this keeps public portfolio links human-readable.
  trailingSlash: true,

  organizationName: 'DocAdam',
  projectName: 'adamthepugh',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      require.resolve('@docusaurus/plugin-client-redirects'),
      {
        redirects: redirectGroups,
      },
    ],
    require.resolve('./scripts/check-links-plugin.cjs'),
  ],

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          sidebarCollapsible: true,
          sidebarCollapsed: false,
        },
        blog: false,
        sitemap: {
          ignorePatterns: ['/docs/**'],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig: ({
    image: 'img/social-card.png',
    navbar: {
      title: 'Adam Pugh',
      logo: {
        alt: 'Adam Pugh',
        src: 'img/logo.svg',
        href: '/',
        target: '_self',
      },
      items: [
        { to: '/work/', label: 'Work', position: 'left' },
        { to: '/experience/', label: 'Experience', position: 'left' },
        {
          href: 'https://docadam.substack.com/',
          label: 'Writing',
          position: 'right',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        {
          type: 'html',
          value: '<a class="navbar__link" href="/adam-pugh-resume.pdf">Resume (PDF)</a>',
          position: 'right',
        },
        {
          href: 'https://github.com/DocAdam',
          label: 'GitHub',
          position: 'right',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `<span class="footer__simple"><span>© ${new Date().getFullYear()} Adam Pugh</span><span aria-hidden="true">|</span><a href="https://www.linkedin.com/in/adampugh/" target="_blank" rel="noopener noreferrer">LinkedIn</a><span aria-hidden="true">|</span><a href="https://github.com/DocAdam" target="_blank" rel="noopener noreferrer">GitHub</a><span aria-hidden="true">|</span><a href="https://docadam.substack.com/" target="_blank" rel="noopener noreferrer">Substack</a></span>`,
    },
  }),
};

module.exports = config;
