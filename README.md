# Adam Pugh portfolio

This repository contains the source for [adamthepugh.com](https://adamthepugh.com/). The portfolio shows public projects, enterprise documentation systems, work experience, selected writing, and a two-page general résumé.

The active site is in `site/`. The `archive/` directory contains preserved legacy material. It is visible in the public GitHub repository, but it is not built into the website. Do not use it as active site content.

## Published structure

The sitemap contains these nine canonical pages:

- [Home](https://adamthepugh.com/): Professional focus, featured work, working method, and contact links.
- [Work](https://adamthepugh.com/work/): The grouped index for products and publications, enterprise documentation systems, and prototypes and contributions.
- [Working Notes and Good Doc Jobs](https://adamthepugh.com/work/working-notes-good-doc-jobs/): A publication, content-audit project, public jobs database, and open data pipeline.
- [TeraCreators Help](https://adamthepugh.com/work/teracreators-help/): A published help system for five games.
- [Euler documentation prototype](https://adamthepugh.com/work/euler-documentation-prototype/): An independent working prototype for clearer MCP and product documentation.
- [Documentation migrations and information architecture](https://adamthepugh.com/work/documentation-migrations/): A 101-wiki migration program that consolidated 1,157 source pages into 469 destination pages.
- [Documentation analytics and reporting](https://adamthepugh.com/work/documentation-analytics/): A SharePoint tracking system, seven Tableau dashboards, and four dashboard examples for documentation work across more than 400 internal products.
- [Documentation tooling and automation](https://adamthepugh.com/work/documentation-tooling/): Internal tools and tests for repeated documentation workflow problems.
- [Experience](https://adamthepugh.com/experience/): Role history, selected results, leadership scope, and Vinyl Junction work.

The site has no public About page. Home contains the useful working-method content. `site/static/llms.txt` contains the longer professional profile and background information. Education information does not include a graduation year.

[Download the two-page résumé](https://adamthepugh.com/adam-pugh-resume.pdf).

## Repository organization

```text
adamthepugh/
├── .github/workflows/        # GitHub Pages build and deployment
├── archive/                  # preserved legacy material; repository only
├── images/                   # legacy image sources; repository only
├── site/
│   ├── docs/                 # nine active Markdown documents
│   ├── scripts/              # link, overview, route, and sitemap checks
│   ├── src/                  # components and styles
│   ├── static/               # résumé, images, domain file, and crawl guidance
│   ├── docusaurus.config.js  # site and navigation configuration
│   ├── route-contract.cjs    # canonical routes and direct legacy redirects
│   ├── sidebars.js           # published Work grouping
│   ├── package-lock.json
│   └── package.json
├── AGENTS.md                 # repository working instructions
└── README.md
```

`work/` is an ignored local workspace for private planning and review artifacts. It is not part of the repository or deployment.

The backend can keep the current `site/docs/` file organization. Each active document has an explicit clean slug, so the public site does not expose that folder structure.

## Local development and checks

Use Node.js 20 or later and npm. Run these commands from `site/`:

```sh
npm ci
npm run start
```

Run the tests and production build before a publication review:

```sh
npm test
npm run build
```

The checks enforce these rules:

- All internal links and anchors must resolve in the generated site.
- A canonical page must link directly to another canonical page. It must not link to a redirect.
- A legacy route must redirect directly to its final canonical route. Redirect chains are not permitted.
- The Work index must contain every active Work page once, in sidebar order.
- The sitemap must contain the exact nine canonical URLs. It must not contain legacy `/docs/` URLs.
- The static Euler `.html` compatibility route must point directly to its final page.

The build stops when one of these checks fails. The checks do not request external websites. Preview a successful production build with:

```sh
npm run serve
```

## Route maintenance

`site/route-contract.cjs` is the route authority. It contains the nine canonical routes, the legacy route groups, and the separate Euler `.html` compatibility route. `site/docusaurus.config.js` gives the redirect groups to the official Docusaurus client-redirects plugin.

When a public route changes:

1. Set the final slug in the retained Markdown file.
2. Update navigation and content links to use that final route.
3. Add the old route to `site/route-contract.cjs` with the final route as its direct target.
4. Do not target another legacy route.
5. Run the tests and build.
6. Inspect `site/build/sitemap.xml` and the generated redirect file.

The sitemap excludes all `/docs/**` compatibility routes. The redirect files exist only for old links and bookmarks.

Canonical content must link directly to the final `/work/` routes. Legacy `/docs/case-studies/` paths can appear only in the route contract, the static Euler compatibility file, redirect tests, and historical audit material. Related public projects must also use the final `/work/` URLs. Keep the legacy redirects after the known inbound links are updated because old bookmarks and untracked external links can still use them.

## Content and résumé maintenance

Keep factual claims tied to the supporting career records and project sources. Do not add personal history, portfolio claims, quotations, or credentials without source support.

The editable résumé authority is `generated/resume-base.md` in the separate Job Finder repository. The normal update flow is:

1. Update and validate the Job Finder Markdown source.
2. Export and review the DOCX.
3. Export a two-page, US Letter PDF.
4. Check both PDF pages and confirm that the PDF is tagged.
5. Replace `site/static/adam-pugh-resume.pdf`.
6. Confirm that the Markdown, DOCX, PDF, Experience page, and `llms.txt` agree.
7. Run the portfolio tests and build.

The navbar, Home, Experience, footer, and `llms.txt` link directly to the root PDF path. Use raw static-file links for this PDF so Docusaurus does not add a trailing slash or create a hashed asset URL.

The files in `site/static/` are copied to the production root. Important files include:

- `llms.txt`: First-person professional profile, background, selected outcomes, and canonical portfolio links.
- `robots.txt`: Crawl guidance and the sitemap location.
- `adam-pugh-resume.pdf`: Downloadable general résumé.
- `img/headshot.jpg`: Home portrait.
- `img/social-card.png`: 1200 by 630 social preview image.
- `img/logo.svg`: Site logo and favicon.
- `img/documentation-analytics/*.png`: Full-size 2022 Tableau dashboard examples used by the documentation analytics case study.

## Git and generated files

Commit the active source, tests, locked dependency files, route contract, public static files, and README when the changes are approved. Do not add these generated or local files:

- `site/build/`
- `site/node_modules/`
- temporary PDF exports
- files from the separate Job Finder repository
- local review and private working files in the ignored `work/` directory

Keep `archive/` unchanged unless an archive task has explicit approval. Preserve unrelated local changes.

## Deployment

The workflow in `.github/workflows/deploy-pages.yml` publishes the site to GitHub Pages after an approved push to `master`. It installs the locked dependencies, runs the tests, builds the site, and publishes `site/build` only after the checks pass.

The older `npm run deploy` command writes to `gh-pages`. It is not the publication method for the current GitHub Actions setup. Keep `site/static/CNAME` as the domain record, and manage the custom domain in GitHub Pages settings.

No local implementation step commits, pushes, opens a pull request, or publishes the site unless that action has explicit approval.
