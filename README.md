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
├── .github/workflows/        # automatic site deployment
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

The site is published at `adamthepugh.com` through GitHub Actions. The workflow in `.github/workflows/deploy-pages.yml` runs after each push to `master`.

After reviewing and committing the changes, push the source branch from the repository root:

```sh
git push origin master
```

GitHub Actions installs the locked dependencies, runs the regression tests, and builds the site with the generated-link check. The deployment job publishes `site/build` only after the build job passes. A failed test or build leaves the published site unchanged.

Check the **Deploy portfolio** run in the repository's **Actions** tab to confirm deployment. To publish again without a source change, select **Run workflow** and choose `master`.

In **Settings → Pages**, keep the source set to **GitHub Actions** and the custom domain set to `adamthepugh.com`. The `github-pages` environment must permit deployments from `master`. The workflow uses GitHub's built-in token; no personal token or SSH secret is required.

The older `npm run deploy` command writes to `gh-pages`. It is not the publishing method for the Actions setup. Keep `site/static/CNAME` as a record of the domain, but manage the custom domain in GitHub Pages settings.
