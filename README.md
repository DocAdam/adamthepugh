# Adam Pugh Portfolio

This repository contains the source for [adamthepugh.com](https://adamthepugh.com/), my professional portfolio.

I use the site to show how I organize complex information, improve documentation systems, lead documentation programs, and build practical workflow tools. It includes public projects, enterprise results, career experience, an active publication and open-data project, and a two-page general résumé.

Start with [Selected Work](https://adamthepugh.com/docs/case-studies/overview/) for projects and results, [Experience](https://adamthepugh.com/docs/experience/overview/) for career history, or [About](https://adamthepugh.com/docs/about/) for my working method and technical range.

## Published structure

The active portfolio has ten substantive pages:

- [Home](https://adamthepugh.com/docs/intro/): A clean landing page with my professional focus, featured public work, selected enterprise results, and contact links.
- [Selected Work](https://adamthepugh.com/docs/case-studies/overview/): An index of the public projects and enterprise systems that best represent my work.
- [Working Notes and Good Doc Jobs](https://adamthepugh.com/docs/case-studies/working-notes-and-good-doc-jobs/): A practitioner publication, reader-facing job database, automated content-audit project, and public source pipeline for technical communicators.
- [Euler documentation prototype](https://adamthepugh.com/docs/case-studies/euler-documentation-prototype/): An independent prototype that shows how I would organize Euler’s public MCP material around reader tasks and maintained content.
- [TeraCreators Help](https://adamthepugh.com/docs/case-studies/teracreators-help/): A published help system that I built from company documents, community knowledge, gameplay screenshots, and user examples.
- [Migrations and information architecture](https://adamthepugh.com/docs/case-studies/migrations-and-ia/): How I led a four-person team that migrated 101 product-documentation wikis and consolidated 1,157 source pages into 469 destination pages.
- [Analytics and reporting](https://adamthepugh.com/docs/case-studies/analytics-and-reporting/): How I replaced a Google Doc tracker with a SharePoint database for documentation work across more than 400 internal products and connected the data to seven Tableau dashboards.
- [Documentation tooling and automation](https://adamthepugh.com/docs/case-studies/documentation-tooling-and-automation/): How I built 10 internal tools with more than 750 automated tests to support repeated documentation workflows.
- [Experience](https://adamthepugh.com/docs/experience/overview/): My role history, selected results, leadership experience, and current Vinyl Junction work.
- [About](https://adamthepugh.com/docs/about/): My working method, technical range, background, and education.

For a career summary, [download my two-page résumé](https://adamthepugh.com/adam-pugh-resume.pdf).

Earlier portfolio and personal material remains in `archive/` for reference. The active site uses the content in `site/`. Keep portfolio claims tied to the supporting career records and project sources when updating the site.

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

The build also checks each `overview.md` or `overview.mdx` section page. Its section index must link to every non-redirect page in the same folder, once each, in the order defined by `site/sidebars.js`. Wrap that list or card grid in one `<div data-section-index>` element. Links elsewhere in the page, including the sidebar and related reading, do not count toward this list.

Redirect pages are excluded. An overview with no non-redirect child pages needs no index. New content pages missing from the sidebar stop the check so their published order can be set. A missing or out-of-order index stops the build and prints a proposed link list; the check does not edit or commit content. This check uses the current `/docs/<section>/<page>/` directory routes.

Preview the production build after a successful build:

```sh
npm run serve
```

## Portfolio maintenance

The files in `site/static/` are copied into the production build. These files are available at the domain root after deployment:

- `llms.txt`: A first-person professional profile, selected outcomes, and links to supporting portfolio pages.
- `robots.txt`: Crawl guidance that permits access and points to the sitemap.
- `adam-pugh-resume.pdf`: The downloadable résumé.

The site uses `site/static/img/headshot.jpg` for the Home portrait and `site/static/img/social-card.png` for social previews. Keep the portrait as an optimized JPEG and the social card at 1200 by 630 pixels. The site uses `site/static/img/logo.svg` as the favicon.

The résumé is linked from the navbar, Home, About, Experience, footer, and `llms.txt`. The editable authority is `generated/resume-base.md` in Job Finder. Keep the general résumé at two pages. Validate the Markdown and DOCX, inspect both rendered PDF pages, then replace `site/static/adam-pugh-resume.pdf`. Check that Experience and `llms.txt` agree with the PDF before publication.

The Home document is intentionally absent from `site/sidebars.js`. Its front matter also hides the page table of contents and pagination. Deeper Work, Experience, and About pages keep the documentation navigation.

Legacy documentation files use `site/src/components/LegacyRedirect.js`. Keep these files when consolidating content. Add a fragment map when an old heading moves to a different heading on the retained page, and test the old route with its fragment after each change.

The static compatibility file at `site/static/docs/case-studies/euler-documentation-prototype.html` preserves the earlier `.html` backlink to the Euler case study. Keep its canonical URL, refresh target, script target, and fallback link aligned with the current route.

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
