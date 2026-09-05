# Adam Pugh’s Work Portfolio

This repository contains the source for [adamthepugh.com](https://adamthepugh.com/), my professional portfolio.

The site presents selected work in documentation operations, information architecture, tooling, automation, and analytics. It includes case studies, writing and content strategy, public projects, and career experience.

Start with [Selected Work](https://adamthepugh.com/docs/case-studies/overview/) for case studies, [Approach](https://adamthepugh.com/docs/portfolio/overview/) for how I work, or [Experience](https://adamthepugh.com/docs/experience/overview/) for my career background.

## Explore the work

- [Euler documentation prototype](https://adamthepugh.com/docs/case-studies/euler-documentation-prototype/): A public working proposal for organizing MCP and product knowledge into documentation that people can use.
- [TeraCreators Help](https://adamthepugh.com/docs/case-studies/teracreators-help/): A public documentation project that organizes community knowledge into a structured help system.
- [Documentation operations](https://adamthepugh.com/docs/case-studies/documentation-operations/): Standards, governance, and workflows for maintaining documentation.
- [Migrations and information architecture](https://adamthepugh.com/docs/case-studies/migrations-and-ia/): Work on content structure, discoverability, and migration.
- [Tooling and automation](https://adamthepugh.com/docs/case-studies/documentation-tooling-and-automation/): Tools and repeatable processes that support documentation work.
- [Analytics and reporting](https://adamthepugh.com/docs/case-studies/analytics-and-reporting/): Measurement and reporting for documentation operations.
- [Writing and content strategy](https://adamthepugh.com/docs/writing-samples/overview/): Methods for task documentation, reference content, change communication, and content planning.

For a career summary, [download my résumé](https://adamthepugh.com/adam-pugh-resume.pdf).

## Source material and limits

Some enterprise source material is proprietary. The portfolio uses selected case studies to describe methods and outcomes without publishing complete internal artifacts. The public projects provide examples that readers can inspect.

Earlier portfolio and personal material is preserved in `archive/` for reference. It is not part of the active site unless it is intentionally brought back in. Keep factual claims supported by source material when updating the portfolio.

## Repository organization

The active site is in `site/`. It uses Docusaurus, Markdown, and GitHub Pages. Make changes to the published portfolio in this directory.

```text
adamthepugh/
├── archive/
│   ├── legacy-docs-reviewed/  # earlier portfolio and source documents
│   ├── legacy-docs-personal/  # earlier personal material
│   └── legacy-root-site/      # earlier Jekyll configuration and pages
├── images/                   # image sources from the earlier site
├── site/
│   ├── docs/                 # portfolio content
│   ├── scripts/              # generated-link check and regression tests
│   ├── src/                  # page components and styles
│   ├── static/               # résumé, images, domain file, and crawl guidance
│   ├── docusaurus.config.js
│   ├── sidebars.js
│   ├── package-lock.json
│   └── package.json
├── CNAME                     # legacy domain file
├── AGENTS.md                 # repository working instructions
└── README.md
```

## Local development and checks

Use Node.js 20 or later and npm. For first-time setup, run these commands from the repository root:

```sh
cd site
npm ci
```

Run all subsequent npm commands from `site/`.

Start the local development server:

```sh
npm run start
```

Before committing changes, run the regression tests and create a production build:

```sh
npm test
npm run build
```

The build stops on broken documentation links and page anchors. It also checks internal hyperlinks in the generated HTML. This check resolves relative links from each page's published URL, including its trailing slash, and checks destination files and HTML anchors. Absolute links with the same origin as the site are checked against the generated files.

The generated HTML check does not request external websites or inspect links inside PDFs or plain-text files. The regression tests cover the earlier Home and Work card failures, missing files and anchors, and failure of the build check.

The checker uses the HTML parser already present in the locked Docusaurus dependency tree. It requires no separate package installation.

Preview the production build after a successful build:

```sh
npm run serve
```

## Portfolio maintenance

The files in `site/static/` are copied into the production build. These files are available at the domain root after deployment:

- `llms.txt`: A professional profile, selected outcomes, and links to supporting portfolio pages.
- `robots.txt`: Crawl guidance that permits access and points to the sitemap.
- `adam-pugh-resume.pdf`: The downloadable résumé.

The résumé is linked from the navbar, Home, About, Work History, footer, and `llms.txt`. To update it, replace `site/static/adam-pugh-resume.pdf` and check that the related site content and `llms.txt` agree with the approved résumé. Then run the tests and build checks.

Keep archived material separate from active site maintenance.

## Deployment

The site is published from the `gh-pages` branch at `adamthepugh.com`. Pushing source changes to `master` does not publish the site.

After reviewing and committing the changes, push the source branch. To publish the site, run this command from `site/` with SSH access to the repository:

```sh
USE_SSH=true npm run deploy
```

The `predeploy` step runs the regression tests and creates a fresh build with the generated-link check. Deployment starts only after both steps pass. The deploy step uses that checked build with `--skip-build` to avoid a second build. Direct Docusaurus deployment commands or disabled npm lifecycle scripts bypass this sequence.

Preserve `site/static/CNAME`, which contains `adamthepugh.com`. This file carries the custom domain setting into the deployed site.
