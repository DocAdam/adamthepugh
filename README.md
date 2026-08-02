# Adam Pugh site repository

This repo contains the rebuilt Docusaurus-based portfolio/help site for adamthepugh.com.

## Active site

The active site lives in:

    site/

This is the version that is built, previewed locally, and deployed to GitHub Pages.

## Legacy content

Earlier portfolio and personal site content has been reviewed and moved into:

    archive/

This includes:

- `archive/legacy-docs-reviewed/`  
  Older portfolio and source documents that were reviewed, mined for useful material, and archived.

- `archive/legacy-docs-personal/`  
  Older personal or non-active content that is not part of the current site structure.

## Current repo structure

    adamthepugh/
    ├── archive/                      # archived legacy content
    ├── docs/                         # remaining old root docs, if any
    ├── images/                       # older source images from the previous site
    ├── pages/                        # older root pages from the previous site
    ├── site/                         # active Docusaurus site
    │   ├── docs/
    │   ├── src/
    │   ├── static/
    │   ├── docusaurus.config.js
    │   ├── sidebars.js
    │   └── package.json
    ├── CNAME                         # legacy root custom domain file
    ├── AGENTS.md                     # repository working instructions
    ├── _config.yml                   # legacy Jekyll config
    ├── index.md                      # legacy root page
    └── README.md

## Working on the active site

From the repo root:

    cd site
    npm run start

Build for production:

    cd site
    npm run build

Serve the production build locally:

    cd site
    npm run serve

## Deploying

The current site deploys to the `gh-pages` branch.

From the repo root:

    cd site
    USE_SSH=true npm run deploy

## Important notes

- The active site is the Docusaurus site inside `site/`.
- The old root-level Jekyll structure is being retained only as legacy material during cleanup.
- If you are updating content for the live site, work inside `site/`, not the old root docs or pages.
- Archived files in `archive/` are not part of the active site unless they are intentionally brought back in.

## Recommended workflow

1. Work on content or config inside `site/`
2. Preview locally with `npm run start`
3. Commit changes from the repo root
4. Deploy from `site/` with `USE_SSH=true npm run deploy`

## Current content rewrite

The active site content has been rewritten and consolidated to make the
portfolio easier to scan and navigate while retaining source-supported claims.
This update includes:

- shorter, clearer overview and case-study pages;
- expanded coverage of documentation tooling and automation;
- revised experience, analytics, portfolio, project, and writing-sample pages;
- refreshed navigation, site configuration, and responsive visual styling; and
- crosslinks that connect related pages and sections.

The rewrite is documented in the active `site/` directory; archived material
remains unchanged and is retained for reference only.

## Custom domain

The live site uses the custom domain:

    adamthepugh.com

The deployed site also depends on:

    site/static/CNAME

to preserve the domain during GitHub Pages deployment.
