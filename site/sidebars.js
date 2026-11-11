const sidebars = {
  portfolioSidebar: [
    {type: 'doc', id: 'case-studies/overview', label: 'Work'},
    {
      type: 'category',
      label: 'Products and publications',
      items: [
        'case-studies/working-notes-and-good-doc-jobs',
        'case-studies/teracreators-help',
      ],
    },
    {
      type: 'category',
      label: 'Enterprise documentation systems',
      items: [
        'case-studies/migrations-and-ia',
        'case-studies/analytics-and-reporting',
        'case-studies/documentation-tooling-and-automation',
      ],
    },
    {
      type: 'category',
      label: 'Prototypes and contributions',
      items: ['case-studies/euler-documentation-prototype'],
    },
    { type: 'doc', id: 'experience/overview', label: 'Experience' },
  ],
};

module.exports = sidebars;
