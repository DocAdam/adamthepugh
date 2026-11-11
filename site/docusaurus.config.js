// @ts-check
const {redirectGroups} = require('./route-contract.cjs');

const config = {
  title: 'Adam Pugh',
  tagline: 'Senior Documentation Engineer',
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
        },
        {
          type: 'html',
          value: '<a class="navbar__link" href="/adam-pugh-resume.pdf">Résumé</a>',
          position: 'right',
        },
        {
          href: 'https://github.com/DocAdam',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Adam Pugh',
          className: 'footer__brand',
          items: [
            {
              html: `<span class="footer__brand-tagline">Senior Documentation Engineer</span><span class="footer__brand-copyright">© ${new Date().getFullYear()} Adam Pugh</span>`,
            },
          ],
        },
        {
          title: 'Explore',
          items: [
            { label: 'Work', to: '/work/' },
            { label: 'Experience', to: '/experience/' },
          ],
        },
        {
          title: 'Elsewhere',
          items: [
            { html: '<a class="footer__link-item" href="/adam-pugh-resume.pdf">Download résumé (PDF)</a>' },
            { label: 'Résumé on LinkedIn', href: 'https://www.linkedin.com/in/adampugh/details/experience/' },
            { label: 'GitHub', href: 'https://github.com/DocAdam' },
            { label: 'Working Notes', href: 'https://docadam.substack.com/' },
          ],
        },
      ],
    },
  }),
};

module.exports = config;
