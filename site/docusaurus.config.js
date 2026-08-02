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
  trailingSlash: false,

  organizationName: 'DocAdam',
  projectName: 'adamthepugh',

  onBrokenLinks: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

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
      },
      items: [
        { to: '/docs/intro', label: 'Home', position: 'left' },
        { to: '/docs/case-studies/overview', label: 'Work', position: 'left' },
        { to: '/docs/portfolio/overview', label: 'Approach', position: 'left' },
        { to: '/docs/experience/overview', label: 'Experience', position: 'left' },
        { to: '/docs/about', label: 'About', position: 'left' },
        {
          href: 'https://www.linkedin.com/in/adampugh/details/experience/',
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
            { label: 'Home', to: '/docs/intro' },
            { label: 'About', to: '/docs/about' },
            { label: 'Work', to: '/docs/case-studies/overview' },
            { label: 'Approach', to: '/docs/portfolio/overview' },
            { label: 'Experience', to: '/docs/experience/overview' },
            { label: 'Documentation Analytics', to: '/docs/data-analytics/overview' },
          ],
        },
        {
          title: 'Elsewhere',
          items: [
            { label: 'Resume on LinkedIn', href: 'https://www.linkedin.com/in/adampugh/details/experience/' },
            { label: 'GitHub', href: 'https://github.com/DocAdam' },
            { label: 'TeraCreators Help', href: 'https://docadam.github.io/TeraCreators-Help/' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Adam Pugh`,
    },
  }),
};

module.exports = config;
