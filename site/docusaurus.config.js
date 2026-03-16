// @ts-check
const config = {
  title: 'Adam Pugh',
  tagline: 'Writer, technical writer, problem-solver, and practical builder',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://adamthepugh.com',
  baseUrl: '/',

  organizationName: 'DocAdam',
  projectName: 'adamthepugh',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

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
        { to: '/docs/about', label: 'About', position: 'left' },
        { to: '/docs/case-studies/overview', label: 'Case Studies', position: 'left' },
        { to: '/docs/writing-samples/overview', label: 'Writing Samples', position: 'left' },
        { to: '/docs/data-analytics/overview', label: 'Data & Analytics', position: 'left' },
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
            { label: 'Case Studies', to: '/docs/case-studies/overview' },
            { label: 'Writing Samples', to: '/docs/writing-samples/overview' },
            { label: 'Data & Analytics', to: '/docs/data-analytics/overview' },
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
