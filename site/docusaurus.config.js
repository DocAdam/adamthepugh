// @ts-check
const config = {
  title: 'Adam Pugh',
  tagline: 'Writer, technical writer, problem-solver, and practical builder',

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
        blog: {
          showReadingTime: true,
          routeBasePath: 'notes',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig: ({
    image: 'img/social-card.jpg',
    navbar: {
      title: 'Adam Pugh',
      logo: {
        alt: 'Adam Pugh',
        src: 'img/logo.svg',
      },
      items: [
        { to: '/', label: 'Home', position: 'left' },
        { to: '/docs/intro', label: 'Portfolio Docs', position: 'left' },
        { to: '/docs/case-studies/overview', label: 'Case Studies', position: 'left' },
        { to: '/docs/writing-samples/overview', label: 'Writing Samples', position: 'left' },
        { to: '/docs/data-analytics/overview', label: 'Data & Analytics', position: 'left' },
        { to: '/about', label: 'About', position: 'left' },
        { to: '/notes', label: 'Notes', position: 'left' },
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
            { label: 'Portfolio Docs', to: '/docs/intro' },
            { label: 'Case Studies', to: '/docs/case-studies/overview' },
            { label: 'Writing Samples', to: '/docs/writing-samples/overview' },
            { label: 'Data & Analytics', to: '/docs/data-analytics/overview' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'About', to: '/about' },
            { label: 'Notes', to: '/notes' },
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