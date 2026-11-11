const sidebars = {
  portfolioSidebar: [
    {
      type: 'category',
      label: 'Work',
      items: [
        'case-studies/overview',
        'case-studies/euler-documentation-prototype',
        'case-studies/teracreators-help',
        'case-studies/migrations-and-ia',
        'case-studies/analytics-and-reporting',
        'case-studies/documentation-tooling-and-automation',
      ],
    },
    { type: 'doc', id: 'experience/overview', label: 'Experience' },
    { type: 'doc', id: 'about', label: 'About' },
  ],
};

module.exports = sidebars;
