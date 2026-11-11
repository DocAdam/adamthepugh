// @ts-check
const config = {
  title: 'Adam Pugh',
  tagline: 'Senior Documentation Engineer',
  favicon: 'img/social-card.png',

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

  plugins: [require.resolve('./scripts/check-links-plugin.cjs')],

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs',
          sidebarCollapsible: true,
          sidebarCollapsed: false,
        },
        blog: false,
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
        href: '/docs/intro/',
        target: '_self',
      },
      items: [
        { to: '/docs/case-studies/overview', label: 'Work', position: 'left' },
        { to: '/docs/experience/overview', label: 'Experience', position: 'left' },
        { to: '/docs/about', label: 'About', position: 'left' },
        {
          href: 'https://adamthepugh.com/adam-pugh-resume.pdf',
          label: 'Resume',
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
          title: 'Explore',
          items: [
            { label: 'Work', to: '/docs/case-studies/overview' },
            { label: 'Experience', to: '/docs/experience/overview' },
            { label: 'About', to: '/docs/about' },
          ],
        },
        {
          title: 'Elsewhere',
          items: [
            { label: 'Download resume (PDF)', href: 'https://adamthepugh.com/adam-pugh-resume.pdf' },
            { label: 'Resume on LinkedIn', href: 'https://www.linkedin.com/in/adampugh/details/experience/' },
            { label: 'GitHub', href: 'https://github.com/DocAdam' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Adam Pugh`,
    },
  }),
};

module.exports = config;
