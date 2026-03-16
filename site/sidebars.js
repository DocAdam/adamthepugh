const sidebars = {
  portfolioSidebar: [
    { type: 'doc', id: 'intro', label: 'Home' },
    { type: 'doc', id: 'about', label: 'About' },
    {
      type: 'category',
      label: 'How I Work',
      items: [
        'portfolio/overview',
        'portfolio/problem-solving',
        'portfolio/tools-and-systems',
      ],
    },
    {
      type: 'category',
      label: 'Case Studies',
      items: [
        'case-studies/overview',
        'case-studies/teracreators-help',
        'case-studies/documentation-operations',
        'case-studies/migrations-and-ia',
        'case-studies/analytics-and-reporting',
      ],
    },
    {
      type: 'category',
      label: 'Writing Samples',
      items: [
        'writing-samples/overview',
        'writing-samples/edited-enterprise-samples',
      ],
    },
    {
      type: 'category',
      label: 'Data & Analytics',
      items: [
        'data-analytics/overview',
        'data-analytics/excel-and-power-query',
        'data-analytics/dashboards-and-reporting',
        'data-analytics/content-audits',
        'data-analytics/measurement-and-operations',
      ],
    },
    {
      type: 'category',
      label: 'Experience',
      items: [
        'experience/overview',
        'experience/work-history',
        'experience/selected-achievements',
        'experience/leadership-and-mentoring',
      ],
    },
    {
      type: 'category',
      label: 'Projects',
      items: [
        'projects/overview',
        'projects/personal-site',
        'projects/vinyl-junction',
      ],
    },
  ],
};

module.exports = sidebars;
