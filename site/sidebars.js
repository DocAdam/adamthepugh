const sidebars = {
  portfolioSidebar: [
    { type: 'doc', id: 'intro', label: 'Home' },
    { type: 'doc', id: 'about', label: 'About' },
    {
      type: 'category',
      label: 'Approach',
      items: [
        'portfolio/overview',
        'portfolio/tools-and-systems',
      ],
    },
    {
      type: 'category',
      label: 'Case Studies',
      items: [
        'case-studies/overview',
        'case-studies/euler-documentation-prototype',
        'case-studies/teracreators-help',
        'case-studies/documentation-operations',
        'case-studies/migrations-and-ia',
        'case-studies/analytics-and-reporting',
        'case-studies/documentation-tooling-and-automation',
      ],
    },
    {
      type: 'category',
      label: 'Writing Samples',
      items: [
        'writing-samples/overview',
      ],
    },
    {
      type: 'category',
      label: 'Data & Analytics',
      items: [
        'data-analytics/overview',
      ],
    },
    {
      type: 'category',
      label: 'Experience',
      items: [
        'experience/selected-achievements',
        'experience/work-history',
        'experience/leadership-and-mentoring',
      ],
    },
    {
      type: 'category',
      label: 'Selected Projects',
      items: [
        'projects/vinyl-junction',
      ],
    },
  ],
};

module.exports = sidebars;
