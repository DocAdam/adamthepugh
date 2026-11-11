const canonicalRoutes = [
  '/',
  '/work/',
  '/work/working-notes-good-doc-jobs/',
  '/work/teracreators-help/',
  '/work/euler-documentation-prototype/',
  '/work/documentation-migrations/',
  '/work/documentation-analytics/',
  '/work/documentation-tooling/',
  '/experience/',
];

const redirectGroups = [
  {
    to: '/',
    from: [
      '/docs/intro',
      '/docs/about',
      '/docs/portfolio/overview',
      '/docs/portfolio/problem-solving',
      '/docs/projects/personal-site',
    ],
  },
  {
    to: '/work/',
    from: [
      '/docs/case-studies/overview',
      '/docs/case-studies/documentation-operations',
      '/docs/writing-samples/overview',
      '/docs/writing-samples/edited-enterprise-samples',
    ],
  },
  {
    to: '/work/working-notes-good-doc-jobs/',
    from: '/docs/case-studies/working-notes-and-good-doc-jobs',
  },
  {
    to: '/work/teracreators-help/',
    from: '/docs/case-studies/teracreators-help',
  },
  {
    to: '/work/euler-documentation-prototype/',
    from: '/docs/case-studies/euler-documentation-prototype',
  },
  {
    to: '/work/documentation-migrations/',
    from: '/docs/case-studies/migrations-and-ia',
  },
  {
    to: '/work/documentation-analytics/',
    from: [
      '/docs/case-studies/analytics-and-reporting',
      '/docs/data-analytics/overview',
      '/docs/data-analytics/content-audits',
      '/docs/data-analytics/dashboards-and-reporting',
      '/docs/data-analytics/excel-and-power-query',
      '/docs/data-analytics/measurement-and-operations',
    ],
  },
  {
    to: '/work/documentation-tooling/',
    from: [
      '/docs/case-studies/documentation-tooling-and-automation',
      '/docs/portfolio/tools-and-systems',
    ],
  },
  {
    to: '/experience/',
    from: [
      '/docs/experience/overview',
      '/docs/experience/leadership-and-mentoring',
      '/docs/experience/selected-achievements',
      '/docs/experience/work-history',
      '/docs/projects/vinyl-junction',
    ],
  },
];

const redirectMap = new Map(
  redirectGroups.flatMap(({from, to}) =>
    (Array.isArray(from) ? from : [from]).map((source) => [source, to]),
  ),
);

const staticRedirectMap = new Map([
  ['/docs/case-studies/euler-documentation-prototype.html', '/work/euler-documentation-prototype/'],
]);

module.exports = {canonicalRoutes, redirectGroups, redirectMap, staticRedirectMap};
