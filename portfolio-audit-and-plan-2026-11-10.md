# Draft: Portfolio audit and proposed plan

Date: 2026-11-10

Status: Phase 1 review only

Implementation status: Not started

## Purpose

This report reviews the public portfolio and its source. It proposes a smaller, content-first site. It does not change the site, résumé, routes, Git history, or deployment.

## Approved implementation conditions

- Treat nine substantive pages as a target, not a quota. Merge enterprise material that does not support a distinct factual example.
- Keep Home outside the documentation sidebar. Hide its right table of contents and previous/next navigation.
- Keep About concise. Keep Vinyl Junction as current work in Experience and the general résumé, but do not feature it on Home.
- State that 101 counts team migration units. Keep the separate 1,157-to-469 page measure and all estimation qualifiers.
- Use plain visitor-facing labels. Keep “Independent prototype” for Euler.
- Preserve routes and fragments. Test redirects and deep links.
- The old Euler `.html` backlink still returned 404 when rechecked. A correction in the Documentation Operating System repository is outside this implementation scope.

## Material assumptions

- “Senior Documentation Engineer” can remain Adam Pugh's professional identity. It must not imply that Meta employment continues after July 2026.
- The approved general résumé source is the canonical base résumé in the private Job Finder career corpus. A résumé made for one job is not the source for the portfolio résumé.
- Enterprise artifacts remain private. The site can describe the problem, contribution, decisions, collaborators, evidence, and result without publishing internal material.
- Existing public URLs must continue to work. A route change must use a direct redirect to the new primary page.
- The first implementation should keep Docusaurus and GitHub Pages. A framework or hosting change does not solve a content problem found in this audit.
- The domain root can continue to direct readers to `/docs/intro/`. A root-route move is not necessary for this content revision.

## Coverage and limits

### Inspected

- Repository instructions, README, site configuration, sidebar, styles, scripts, package configuration, and deployment workflow.
- Git branch, remote, local status, recent history, and the latest public deployment run.
- All 25 documentation routes in the sitemap and the domain root.
- All source pages in `site/docs/`.
- Navbar, sidebar, footer, root redirect, crawl files, and résumé links.
- The local and live résumé PDF.
- The public Euler and TeraCreators artifacts and their source repositories.
- The current canonical general résumé and its documented DOCX export process.
- Internal links through the site tests and production build.
- Important external links through direct HTTP checks.

### Limits

- The computer-use browser host was unavailable. I could not do a full visual test of the live site in desktop and mobile browsers.
- I did not run a screen reader or a keyboard-only browser session.
- LinkedIn returned status 999 to the automated check. This result does not prove that the public profile link is broken.
- I did not inspect private employer artifacts. I used the approved career corpus only to check public facts and scope boundaries.
- I did not change or test the public example repositories.
- I did not fetch or change Git state. The local `origin/master` reference already matched the local portfolio branch.

## Verified repository and publication workflow

| Item | Verified state |
| --- | --- |
| Correct repository | `/Users/adampugh/GitHub/adamthepugh` |
| Active site source | `site/` |
| Preserved legacy source | `archive/` |
| Source branch | `master` |
| Remote | `origin` → `git@github.com:DocAdam/adamthepugh.git` |
| Audited revision | `450cf22289dee1c6909eb369b40b003bc6f475bb` |
| Initial portfolio worktree | Clean; no staged or unstaged changes |
| Live host | GitHub Pages with `adamthepugh.com` |
| Automatic trigger | Each push to `master` starts `.github/workflows/deploy-pages.yml` |
| Build gate | `npm ci`, `npm test`, and `npm run build` must pass before deployment |
| Published output | `site/build` through GitHub Pages Actions |
| Latest audited run | Successful push deployment for revision `450cf22` on 2026-09-05 |
| Old command | `npm run deploy` writes to `gh-pages`; the README says this is not the current publication method |

Yes, a push to `origin/master` automatically starts a deployment. A push does not prove publication. The GitHub Actions run and the live revision must also be checked.

## Current verification results

### Passed

- `npm test`: 11 tests passed.
- `npm run build`: passed.
- Generated internal-link check: 1,015 internal links in 27 HTML files passed.
- Section overview check: four overview pages passed; one redirect overview was excluded.
- Public portfolio routes: 26 generated `index.html` routes returned live content.
- Live/source comparison: all 26 HTML pages matched after normalization of the generated main JavaScript bundle filename.
- Résumé comparison: the live and local PDF files had the same SHA-256 value.
- Public résumé request: HTTP 200 with `application/pdf`.
- Public Euler prototype, Euler source repository, TeraCreators guide, TeraCreators source repository, and the linked TeraCreators commit: HTTP 200.
- Current Euler public demo: overview plus nine Euler pages returned HTTP 200.
- Current TeraCreators guide: five game sections are live and present in its sitemap.

### Failed

- The Documentation Operating System README links to `https://adamthepugh.com/docs/case-studies/euler-documentation-prototype.html`. That URL returns 404. The current portfolio route ends with `/euler-documentation-prototype/`.

### Warnings and incomplete checks

- LinkedIn blocked the automated request with status 999.
- The build reported old browser-support data. This did not stop the build. A dependency refresh is outside this content task.
- The build reported a Node local-storage warning. This did not stop the build.
- Redirect-only pages return HTTP 200 and use a client-side React redirect. They are not HTTP redirects.
- The live site needs visual checks for desktop, mobile, keyboard use, focus, light mode, and dark mode during Phase 2.

## Current public inventory

### Site size

- 26 public HTML routes: the domain root plus 25 documentation routes.
- 17 routes contain substantive content.
- 8 documentation routes contain only a client-side redirect.
- 1 public PDF download.
- 1 public `llms.txt` profile file.
- 7 top-navbar links: Home, Work, Approach, Experience, About, Resume, and GitHub.

### Downloads and public artifacts

| Item | Current location | State |
| --- | --- | --- |
| General résumé PDF | `/adam-pugh-resume.pdf` | Live and downloadable; outdated employment dates; selectable text; not tagged for accessibility |
| Euler public example | `https://docadam.github.io/docs-operating-system/euler/` | Live independent prototype |
| Documentation Operating System | `https://docadam.github.io/docs-operating-system/` | Live project overview; not linked from the portfolio case study |
| Euler source | `https://github.com/DocAdam/docs-operating-system` | Live public repository; not linked from the portfolio case study |
| TeraCreators Help | `https://docadam.github.io/TeraCreators-Help/` | Live published community documentation |
| TeraCreators source | `https://github.com/DocAdam/TeraCreators-Help` | Live public repository |
| TeraCreators change example | Commit `e4ad6e9` | Live and linked from the case study |
| Vinyl Junction | No public artifact link on the page | The page describes the business but does not let a visitor inspect it |

## Most important problems

1. **The site states that past Meta work is current.**
   - Home says “I work as a Senior Documentation Engineer” in a current-focus section.
   - Work History says `2023–Present`.
   - `llms.txt` says “currently supports” and `2023–present`.
   - The PDF says `July 2023–Present` and uses present-tense Meta bullets.
   - Verified end date: July 2026.

2. **The strongest public proof is not the first proof on Home.**
   - Home features TeraCreators Help and Vinyl Junction.
   - It does not feature the Euler documentation prototype.
   - Vinyl Junction has no inspectable artifact link on its page.

3. **Several labels promise content that the page does not contain.**
   - “Writing Samples” has no writing samples.
   - “Experience” opens a redirect to “Selected Achievements,” not an experience overview.
   - Several pages use “Case Study” in the page title but provide a general capability summary.
   - “Selected Projects” contains one short project page.

4. **The same evidence appears on too many pages.**
   - The 101 migrations, 59% reduction, 400+ products, seven dashboards, 139+ pages, 234 pages, and tooling counts appear across Home, Approach, Tools, case studies, analytics, achievements, work history, and `llms.txt`.
   - The repetition does not add context. It makes the site feel larger than its evidence base.

5. **The enterprise pages do not yet work as full case studies.**
   - Most pages do not name a specific audience.
   - Some pages combine work from different roles and dates.
   - Collaborators and Adam's direct contribution are often absent.
   - The pages provide metrics but do not always connect them to one problem, artifact, or decision.

6. **The public work has an evidence-path gap.**
   - The Euler page links to the demo and public source material. It does not link to the Documentation Operating System overview or repository.
   - The TeraCreators page has good artifact links. Its “Tera Helper” recognition claim needs a retained source or user confirmation.

7. **The site structure uses too many gateways.**
   - Home sends readers to Work, Approach, Experience, and the sidebar.
   - About sends readers back to Home, How I Work, and Work.
   - Approach sends readers to Work.
   - The reader must pass through summary pages before reaching evidence.

8. **The design uses more card and special-case styling than the content needs.**
   - Home has proof cards and start cards.
   - Several pages use content-card grids.
   - Euler has a separate hero, boundary panel, five-part model, and closing panel.
   - Hover lift, shadows, chips, and multiple grid types add visual weight without adding evidence.

## Page-by-page audit

The “Primary lesson” column states what a visitor should learn. The “Finding” column states whether the page delivers it.

| Route and source | Current label, title, and subject | Primary lesson and finding | Useful, repeated, outdated, or missing material | Proposed action |
| --- | --- | --- | --- | --- |
| `/` — `site/src/pages/index.js` | No nav label. Root redirect. | A visitor should reach the main page. It delivers this with a client redirect. | No unique content. | **Keep.** Preserve the domain root and direct it to Home. |
| `/docs/intro/` — `site/docs/intro.md` | Navbar/sidebar: Home. Browser title: Adam Pugh / Senior Documentation Engineer. Subject: profile, metrics, featured work, current focus, and start links. | A visitor should understand Adam's value and reach the best proof. It only partly delivers this. | Unique: headshot and concise identity. Repeated: capability summary and metrics. Outdated: current Meta implication. Missing: Euler as featured work. | **Revise.** Make this a direct evidence-first landing page. |
| `/docs/about/` — `site/docs/about.md` | Navbar/sidebar: About. Page title: About Adam Pugh. Subject: profile, background, education, and personal context. | A visitor should understand the person, career arc, and method. It delivers most of this. | Unique: editorial background, education, personal context. Repeated: four capability cards and profile text. | **Keep and revise.** Make this the primary home for career arc, working method, technical boundaries, and personal context. |
| `/docs/portfolio/overview/` — `site/docs/portfolio/overview.md` | Navbar: Approach. Sidebar: Approach / Documentation Engineering Approach. H1: How I Work. | A visitor should understand the working method. It delivers this. | Unique: four-step working model. Repeated: identity, capability cards, metrics. | **Merge into About.** Redirect this route to About. |
| `/docs/portfolio/tools-and-systems/` — `site/docs/portfolio/tools-and-systems.md` | Sidebar: Approach / Documentation Engineering Tools and Systems. H1: Tools and Systems. | A visitor should understand technical range and its purpose. It partly delivers this. | Unique: clear technical boundary and toolchain model. Repeated: metrics. Weak: long tool-chip list. Broken path: its Personal Site link opens a redirect page. | **Merge into About.** Keep a short technical-range section. Redirect this route to About. |
| `/docs/portfolio/problem-solving/` — `site/docs/portfolio/problem-solving.md` | Not in nav. Title: How I Work. Redirect-only legacy route. | A visitor should reach the current method page. It delivers this only through JavaScript. | No unique content. | **Keep as a direct redirect to About.** Avoid a redirect chain. |
| `/docs/case-studies/overview/` — `site/docs/case-studies/overview.md` | Navbar: Work. Sidebar: Case Studies / Documentation Engineering Case Studies. Subject: work index and confidentiality boundary. | A visitor should see the best work and choose an artifact quickly. It mostly delivers this, but all items look equal. | Unique: public/private boundary and public-project context. Repeated: approach summary. | **Keep and revise.** Retitle the visible page “Selected Work.” Put inspectable public artifacts first. Separate public work from enterprise summaries. |
| `/docs/case-studies/euler-documentation-prototype/` — `site/docs/case-studies/euler-documentation-prototype.md` | Sidebar: Euler documentation prototype. H1: A documentation proposal for Euler. Subject: independent proposal and demo. | A visitor should understand the gap, Adam's reasoning, the demo, and its limits. It delivers this well. | Unique: alternatives, proposal model, public sources, clear boundary, live demo. Missing: Documentation Operating System overview and repository links. | **Keep and revise lightly.** Label it “Independent prototype.” Add exact project and source links. Keep the validation limits. |
| `/docs/case-studies/teracreators-help/` — `site/docs/case-studies/teracreators-help.md` | Sidebar/page: TeraCreators Help Documentation Project / TeraCreators Help. Subject: community help project. | A visitor should understand the player problem, source mix, contribution, live artifact, and result. It delivers most of this. | Unique: collection method, source boundaries, gameplay-order decision, live guide, repository, change example. Verification gap: Tera Helper recognition source was not in the repository. | **Keep and revise lightly.** Label it “Published community documentation.” Keep contribution and source boundaries. Confirm or remove the recognition claim. |
| `/docs/case-studies/documentation-operations/` — `site/docs/case-studies/documentation-operations.md` | Sidebar/page: Documentation Operations Case Study / Documentation Operations. Subject: general operating model and repeated metrics. | A visitor should understand one operations problem and result. It does not deliver a specific case. | Useful: four-part operating model. Repeated: all four evidence rows. Missing: one audience, role, artifact, date, and collaborator set. | **Merge and archive.** Put the short operating model on Selected Work or About. Redirect to Selected Work. |
| `/docs/case-studies/migrations-and-ia/` — `site/docs/case-studies/migrations-and-ia.md` | Sidebar/page: Migrations and Information Architecture Case Study. Subject: several migration and structure outcomes. | A visitor should understand migration as a content decision. It partly delivers this. | Useful: decision sequence. Repeated: metrics. Missing: role/date boundaries, audience, collaborator scope, artifact description. Several distinct efforts appear as one case. | **Keep and revise.** Focus on the factual 101-migration program and state the team and measure boundaries. |
| `/docs/case-studies/analytics-and-reporting/` — `site/docs/case-studies/analytics-and-reporting.md` | Sidebar/page: Documentation Analytics and Reporting Case Study. Subject: tracking and dashboards. | A visitor should understand how reporting changed a decision or workflow. It partly delivers this. | Useful: “reporting supports a decision” principle. Repeated: metrics. Missing: audience, dashboard inputs/outputs, adoption, and role/date context. | **Keep and revise.** Make this the primary home for analytics and reporting evidence. Merge the separate analytics overview into it. |
| `/docs/case-studies/documentation-tooling-and-automation/` — `site/docs/case-studies/documentation-tooling-and-automation.md` | Sidebar/page: Documentation Tooling and Automation Case Study. Subject: internal tool portfolio. | A visitor should understand why the tools existed, Adam's contribution, validation, and limits. It partly delivers this. | Useful: workflow-first model and counts. Missing: representative tool problems, human-review boundary, collaborators, and artifact descriptions. The 466-hour result must keep “estimated.” | **Keep and revise.** Use representative factual examples. Keep the documentation-tooling boundary. |
| `/docs/writing-samples/overview/` — `site/docs/writing-samples/overview.md` | Sidebar category: Writing Samples. H1: Writing and Content Strategy. Subject: page-type judgment. | A visitor expects actual writing samples. The page does not deliver them. | Useful: content-type criteria. Repeated: general method. Missing: inspectable samples. | **Merge and archive.** Move the small method section to About or Selected Work. Redirect to Selected Work. |
| `/docs/writing-samples/edited-enterprise-samples/` — `site/docs/writing-samples/edited-enterprise-samples.md` | Not in nav. Redirect-only route. | A visitor should reach the current writing page. | No unique content. | **Keep as a direct redirect to Selected Work.** |
| `/docs/data-analytics/overview/` — `site/docs/data-analytics/overview.md` | Footer: Documentation Analytics. Sidebar: Data & Analytics. H1: Documentation Analytics. Subject: analytics model and repeated evidence. | A visitor should understand analytics methods and proof. It mostly repeats the analytics case study. | Useful: concise method table. Repeated: 234 pages, 400+ products, seven dashboards, and tool list. | **Merge into Analytics and Reporting.** Redirect to that case study. |
| `/docs/data-analytics/content-audits/` — `site/docs/data-analytics/content-audits.md` | Not in nav. Redirect-only route. | A visitor should reach the current analytics content. | No unique content. | **Keep as a direct redirect to Analytics and Reporting.** |
| `/docs/data-analytics/dashboards-and-reporting/` — `site/docs/data-analytics/dashboards-and-reporting.md` | Not in nav. Redirect-only route. | A visitor should reach the current analytics content. | No unique content. | **Keep as a direct redirect to Analytics and Reporting.** |
| `/docs/data-analytics/excel-and-power-query/` — `site/docs/data-analytics/excel-and-power-query.md` | Not in nav. Redirect-only route. | A visitor should reach the current analytics content. | No unique content. | **Keep as a direct redirect to Analytics and Reporting.** |
| `/docs/data-analytics/measurement-and-operations/` — `site/docs/data-analytics/measurement-and-operations.md` | Not in nav. Redirect-only route. | A visitor should reach the current analytics content. | No unique content. | **Keep as a direct redirect to Analytics and Reporting.** |
| `/docs/experience/overview/` — `site/docs/experience/overview.md` | Navbar: Experience. Redirects to Selected Achievements. | A visitor expects a career overview. The route does not contain one. | No unique content. The redirect adds an avoidable step from the main nav. | **Keep and replace with the primary Experience page.** |
| `/docs/experience/selected-achievements/` — `site/docs/experience/selected-achievements.md` | Sidebar: Documentation Engineering Achievements. Subject: metric summary and capabilities. | A visitor should understand high-value outcomes. It delivers a summary, but it repeats many pages. | Useful: compact scope table. Repeated: almost all evidence. Missing: dates and role context for some sections. | **Merge into Experience.** Redirect this route to Experience. |
| `/docs/experience/work-history/` — `site/docs/experience/work-history.md` | Sidebar: Adam Pugh Work History. Subject: career timeline. | A visitor should understand roles, dates, and scope. It delivers this, but the latest role is outdated. | Unique: role-by-role history. Outdated: Meta `2023–Present` and present-tense work. | **Merge into Experience.** Use this content as the core of the new overview, then redirect this route to Experience. |
| `/docs/experience/leadership-and-mentoring/` — `site/docs/experience/leadership-and-mentoring.md` | Sidebar: Leadership and Mentoring. Subject: leadership scope and principles. | A visitor should understand management scope and leadership approach. It delivers a short summary. | Unique: role scope table. Repeated: management counts and broad principles. | **Merge into Experience and About.** Redirect this route to Experience. |
| `/docs/projects/vinyl-junction/` — `site/docs/projects/vinyl-junction.md` | Sidebar: Selected Projects / Vinyl Junction. Subject: Etsy business as sustained ownership. | A visitor should understand an inspectable supporting project. It does not provide the artifact or results. | Unique: long-term operational context. Missing: live shop link, concrete example, supported outcome, and clear portfolio relevance. | **Move and archive.** Keep one short personal-context paragraph on About. Redirect this route to About. |
| `/docs/projects/personal-site/` — `site/docs/projects/personal-site.md` | Not in nav. Redirects to Tools and Systems. | A visitor should reach the current technical-range content. | No unique content. | **Keep as a direct redirect to About.** Avoid a redirect chain. |

## Navigation and site-section audit

| Section and source | Current state | Proposed action |
| --- | --- | --- |
| Navbar — `site/docusaurus.config.js` | Seven links. Home, Approach, About, and Experience lead to overlapping summaries. | Use Work, Experience, About, Resume, and GitHub. Make the brand/title link the Home path. |
| Sidebar — `site/sidebars.js` | Seven top-level items or categories. It exposes weak and repeated sections. | Show Home, Selected Work and its five retained examples, Experience, and About. Do not show redirect-only routes. |
| Footer — `site/docusaurus.config.js` | Repeats Home, About, Work, Approach, Experience, Analytics, résumé, LinkedIn, GitHub, and TeraCreators. | Use a small set: Work, Experience, About, résumé, GitHub, and LinkedIn. Remove links to merged sections. |
| `llms.txt` — `site/static/llms.txt` | Useful machine-readable profile, but it says the Meta role is current and does not list Euler in the project section. | Update after the page content and résumé agree. Keep facts, dates, boundaries, and canonical links synchronized. |
| Crawl and sitemap | The sitemap includes eight redirect-only documentation pages. | Keep the old URLs, but exclude redirect-only pages from navigation and, if the current Docusaurus version supports it safely, from the sitemap and search. Verify this behavior before use. |
| CSS — `site/src/css/custom.css` | Good type size, line length, light/dark colors, and mobile one-column rules. It also has several grids, shadows, hover lift, chips, and a special Euler presentation. | Keep typography, width, color, and responsive rules. Use fewer card types. Remove hover lift and large shadows. Add reduced-motion behavior if transitions remain. Underline links in body text. |

## Clear primary homes for substantive topics

| Topic | Primary home | Supporting pages |
| --- | --- | --- |
| Professional identity and value | Home | About, Experience |
| Best public and enterprise evidence | Selected Work | Five retained work pages |
| Euler prototype | Euler documentation prototype | Selected Work summary |
| TeraCreators Help | TeraCreators Help | Selected Work summary |
| Migration and information architecture | Migrations and Information Architecture | Experience summary |
| Documentation analytics | Analytics and Reporting | Experience summary |
| Documentation tooling | Documentation Tooling and Automation | About technical boundary, Experience summary |
| Working method | About | Short use in each case study only where it explains a decision |
| Tools and technical range | About | Relevant case studies |
| Career history and leadership | Experience | Résumé PDF |
| Education and personal context | About | Résumé PDF for education |
| General career record | Résumé PDF | Experience |

## Proposed navigation tree

```text
Adam Pugh (Home)
├── Work
│   ├── Selected Work
│   ├── Euler documentation prototype
│   ├── TeraCreators Help
│   ├── Migrations and information architecture
│   ├── Analytics and reporting
│   └── Documentation tooling and automation
├── Experience
├── About
├── Resume (PDF)
└── GitHub
```

The primary navbar should show Work, Experience, and About on the left. Resume and GitHub can stay on the right. The site title or logo should lead to Home. A separate Home navbar item is not necessary.

## Proposed landing-page outline

1. **Identity and value**
   - Use one direct sentence about complex product documentation and maintainable knowledge systems.
   - Do not state or imply current Meta employment.
   - Use two primary actions: View selected work and Download résumé.

2. **Featured public work**
   - Euler documentation prototype — label: Independent prototype.
   - TeraCreators Help — label: Published community documentation.
   - For each item, link to the case page, live artifact, and source repository.

3. **Selected enterprise evidence**
   - Migrations and information architecture.
   - Analytics and reporting.
   - Documentation tooling and automation.
   - Give each item one problem, one result, and an “Employer-safe summary” label.

4. **Career scope**
   - Use two or three sentences about technical writing, documentation engineering, operations, and leadership.
   - Link to Experience.

5. **Contact and public profiles**
   - GitHub, LinkedIn, and résumé.

Remove the current proof-card grid, Current Focus section, Vinyl Junction feature, three Start Here cards, and the “How to use this site” note. Their useful information will move to stronger primary pages.

## Current-to-proposed route map

| Current route | Proposed state | Target or primary subject |
| --- | --- | --- |
| `/` | Keep redirect | `/docs/intro/` |
| `/docs/intro/` | Keep and revise | Home |
| `/docs/case-studies/overview/` | Keep and revise | Selected Work |
| `/docs/case-studies/euler-documentation-prototype/` | Keep and revise | Euler independent prototype |
| `/docs/case-studies/teracreators-help/` | Keep and revise | TeraCreators published community docs |
| `/docs/case-studies/migrations-and-ia/` | Keep and revise | Employer-safe migration work |
| `/docs/case-studies/analytics-and-reporting/` | Keep and revise | Employer-safe analytics work |
| `/docs/case-studies/documentation-tooling-and-automation/` | Keep and revise | Employer-safe tooling work |
| `/docs/case-studies/documentation-operations/` | Redirect | Selected Work |
| `/docs/experience/overview/` | Keep and replace redirect with content | Experience |
| `/docs/experience/selected-achievements/` | Redirect | Experience |
| `/docs/experience/work-history/` | Redirect | Experience |
| `/docs/experience/leadership-and-mentoring/` | Redirect | Experience |
| `/docs/about/` | Keep and revise | About, method, technical range, personal context |
| `/docs/portfolio/overview/` | Redirect | About |
| `/docs/portfolio/tools-and-systems/` | Redirect | About |
| `/docs/portfolio/problem-solving/` | Redirect | About |
| `/docs/writing-samples/overview/` | Redirect | Selected Work |
| `/docs/writing-samples/edited-enterprise-samples/` | Redirect | Selected Work |
| `/docs/data-analytics/overview/` | Redirect | Analytics and Reporting |
| `/docs/data-analytics/content-audits/` | Redirect | Analytics and Reporting |
| `/docs/data-analytics/dashboards-and-reporting/` | Redirect | Analytics and Reporting |
| `/docs/data-analytics/excel-and-power-query/` | Redirect | Analytics and Reporting |
| `/docs/data-analytics/measurement-and-operations/` | Redirect | Analytics and Reporting |
| `/docs/projects/vinyl-junction/` | Redirect | About |
| `/docs/projects/personal-site/` | Redirect | About |

This plan reduces substantive pages from 17 to 9. It keeps all 25 documentation URLs available through content pages or direct redirects.

## Work-example assessment

| Example | Problem and audience | Adam's contribution | Artifact and supported outcome | Classification and action |
| --- | --- | --- | --- | --- |
| Euler documentation prototype | People can see the public MCP fields, but they need task context, prerequisites, results, and maintenance guidance. Audience: prospective MCP users and documentation reviewers. | Independent research, content model, alternatives, derived examples, public demo, and explicit validation boundary. | Live demo, public repository, reusable templates, public-data workspace, and visual maps. It proves a working proposal. It does not prove Euler adoption or customer results. | **Independent prototype. Keep and feature.** Add the Documentation Operating System overview and repository links. |
| TeraCreators Help | Players need stable help from scattered community and company sources. | Source collection, curation, gameplay-order structure, terminology, screenshots, page models, Docusaurus site, and maintenance. The page already distinguishes Adam's structure from source contributions. | Live guide for five games, public repository, and a recorded rescue-navigation revision. It proves published and maintained community documentation. It does not prove traffic or product-company ownership. | **Published community documentation. Keep and feature.** Confirm the Tera Helper recognition claim. |
| Migrations and information architecture | Current page combines several structure and migration problems for internal users and maintainers. | The page states decisions and metrics, but it does not separate direct work, management work, team work, and dates. | Internal artifacts are confidential. Public metrics are approved, but the page needs clearer attribution and scope. | **Production enterprise work. Keep and rewrite.** |
| Analytics and reporting | Documentation teams and managers needed clear scope, progress, and operational signals. | Dashboard ownership and tracking work are stated. Audience, inputs, decision use, and role/date context need more detail. | Internal dashboards and trackers are not public. Approved outcomes include product tracking and seven dashboards. | **Production enterprise work. Keep and rewrite.** |
| Tooling and automation | Repeated documentation tasks created review, maintenance, and administration cost. | Problem selection, workflow design, AI-assisted implementation direction, validation, and maintenance. The current page needs representative examples and human-review boundaries. | Internal tools are not public. Counts are approved. The 466-hour value is an annual estimate and must stay labeled as estimated. | **Production enterprise work. Keep and rewrite.** |
| Documentation operations | General model rather than one case. | Contribution is spread across the other enterprise pages. | No unique artifact. Metrics repeat other pages. | **Merge.** Use its four-part model on Selected Work or About. |
| Vinyl Junction | Long-term product communication and operations for customers. | Direct ownership is stated. | No live shop or concrete artifact link is present. No supported result appears on the page. | **Supporting personal context. Remove from featured work and merge into About.** |

## Résumé audit

### Public résumé links

All current links point to `/adam-pugh-resume.pdf`:

- Navbar.
- Home.
- About.
- Work History.
- Footer.
- `llms.txt`.
- Repository README.

The live PDF returns HTTP 200. Its bytes match `site/static/adam-pugh-resume.pdf`.

### Current PDF condition

| Check | Result |
| --- | --- |
| Pages | 3 |
| Text | Selectable and extractable |
| Link annotations | Email, LinkedIn, portfolio, and GitHub are present |
| Page size | U.S. Letter |
| Accessibility tags | Absent |
| Visual defects | No clipping, overlap, black boxes, or broken glyphs found in rendered pages |
| Page balance | Poor. Page 2 is very full. Page 3 is less than half full. |
| Current date error | Meta Senior Documentation Engineer says `July 2023–Present` |
| Verb tense | Latest Meta bullets use present tense |
| PDF source metadata | macOS Quartz PDFContext; created 2026-08-12 |

### Editable source and generation process

- The portfolio repository contains only the PDF. It does not contain the editable résumé source.
- The exact application file used to make the August PDF was not found in the portfolio repository.
- The approved current general source is the canonical `generated/resume-base.md` in Job Finder.
- That source already uses `July 2023–July 2026`.
- Job Finder reads the base résumé plus approved fact, metric, story, bullet, style, and summary files.
- `scripts/export-resume.sh` uses Pandoc and the repository reference DOCX to create a DOCX.
- `npm run resume:export-validate` validates the DOCX against the Markdown source and document rules.
- No automated PDF export step was found. The exact August PDF export process is therefore not confirmed. The Quartz producer suggests a manual macOS PDF export, but this is an inference.

### Fact and scope conflicts to correct

- Meta Senior Documentation Engineer: July 2023–July 2026, not Present.
- Meta Documentation Engineering Manager: March 2022–June 2023.
- Use past tense for completed Meta work.
- Use “about 13 years” for the management-duration summary unless the approved source changes.
- Keep 20 user-facing launches tied to the measurement date of May 2026. Do not present it as the final July 2026 count.
- Keep the 80%+ coverage and 98-launch denominator tied to the 2025 initiative. Do not combine it with the 2026 launch count.
- Keep 400+ products at Meta separate from the 350+ department scope at Jack Henry.
- Keep 46 directly supported products separate from the 350+ department scope.
- Keep the 234-page freshness system separate from authored or reorganized page counts.
- Keep “estimated” and “per year” with the 466-hour tooling result.

### Proposed résumé update approach

1. Use the canonical base résumé, not a job-tailored résumé or an export copy.
2. Reconcile all public facts with the approved corpus before layout work.
3. Create a concise general résumé for portfolio visitors.
4. Target two readable pages. Use three pages only if a two-page version harms readability or removes important career scope.
5. Keep recent evidence and management scope. Condense older roles before reducing font size or margins.
6. Generate and validate a DOCX through the existing Job Finder process.
7. Export a tagged PDF if the available tool supports reliable tags. If it does not, report that limit.
8. Render all pages. Check page breaks, line wraps, margins, text size, link color, and page balance.
9. Confirm selectable text and all link annotations.
10. Copy only the approved public PDF into `site/static/adam-pugh-resume.pdf`.
11. Update Home, Experience, About, and `llms.txt` so the site and PDF agree.

Do not add private evidence records, private employer details, or local source paths to the public PDF or site.

## Design changes

These changes improve access to content. They are not a redesign project.

1. Keep the current system fonts, readable line height, restrained blue, content width, light mode, dark mode, and headshot.
2. Use one linked-list or bordered-summary pattern for work. Do not use a different card system for each page.
3. Remove card lift and large shadows. Use borders and spacing for hierarchy.
4. Reduce decorative metric tiles. Put metrics next to the case or role that explains them.
5. Keep one H1 and a clear H2 sequence on each substantive page.
6. Underline body links. Do not depend on color alone.
7. Keep visible keyboard focus from Docusaurus. Test all custom links and controls.
8. Add a reduced-motion rule if any transition remains.
9. Keep the mobile one-column layout. Test tables and long links at narrow widths.
10. Use short evidence labels only when they clarify status: Independent prototype, Published community documentation, or Employer-safe production summary.
11. Keep a small amount of personality through the headshot, first-person copy, and a short personal-context section on About.

## Proposed implementation order

1. **Create a protected starting record.**
   - Recheck the portfolio worktree, branch, remote, and revision.
   - Record unrelated state in Job Finder, TeraCreators Help, and Documentation Operating System.
   - Do not include changes from those repositories in the portfolio commit.

2. **Lock the fact set.**
   - Use July 2026 as the Meta end date.
   - Use the canonical base résumé and approved career evidence.
   - Confirm the Tera Helper recognition claim or remove it.
   - Keep all metric qualifiers and role boundaries.

3. **Update the résumé first.**
   - Produce the validated general résumé, DOCX, and PDF.
   - Complete PDF text, link, and visual checks.
   - Replace the public PDF only after it passes.

4. **Build the retained primary pages.**
   - Home.
   - Selected Work.
   - Euler.
   - TeraCreators Help.
   - Migrations and Information Architecture.
   - Analytics and Reporting.
   - Documentation Tooling and Automation.
   - Experience.
   - About.

5. **Consolidate without content loss.**
   - Move unique method, tool, leadership, education, and personal-context material to its primary home.
   - Compare each old page with the new page before conversion to a redirect.
   - Do not move repeated text when the primary page already states the same fact with better context.

6. **Update navigation and redirects.**
   - Reduce navbar, sidebar, and footer links.
   - Point every old route directly to its final target.
   - Avoid redirect chains.
   - Check important deep links.

7. **Update support files and related public links.**
   - Update `README.md` if commands, structure, or maintenance steps change.
   - Update `llms.txt` to match the approved public facts.
   - Fix the old `.html` backlink in the Documentation Operating System repository only if that repository is added to the approved Phase 2 scope. Do not include it in the portfolio commit.

8. **Run repository checks.**
   - `npm test`.
   - `npm run build`.
   - Production preview with `npm run serve`.
   - Internal links, anchors, assets, section indexes, and redirect targets.

9. **Run content and access checks.**
   - Labels, titles, H1 headings, and subjects agree.
   - No repeated introduction remains without a navigation purpose.
   - Public artifacts are one click from Home or Selected Work.
   - Employer work has role, team, artifact, outcome, and confidentiality boundaries.
   - Mobile, keyboard, headings, contrast, focus, light mode, and dark mode work.
   - The résumé opens, downloads, has selectable text, and has working links.
   - No private material or unrelated changes are present.

10. **Review the exact diff and publish.**
    - Commit only the approved portfolio files.
    - Push the approved commit to `origin/master`.
    - Do not force-push.
    - Confirm the Actions run uses the expected commit and succeeds.
    - Confirm `origin/master` has the expected commit.
    - Check Home, all retained work pages, all redirect targets, and the PDF on the live domain.
    - Compare the live PDF hash with the committed file.

## Phase 2 verification report format

Report these groups separately:

- **Passed:** completed checks with evidence.
- **Failed:** checks that found a defect.
- **Blocked:** checks that need access, a fact, or an external service.
- **Unrun:** checks not completed, with the reason.

A successful build is not proof that external artifacts, browser layouts, accessibility, redirects, or publication are correct.

## Resolved factual question

The prior TeraCreators page said that the company gave Adam the “Tera Helper” role. The project repository did not contain source support for that statement. The approved implementation removes the statement instead of publishing an unsupported claim.

## Recommended decision

Approve the nine-page substantive structure and the direct-redirect map as the Phase 2 scope. This structure makes Euler and TeraCreators easy to inspect, gives each enterprise topic one primary home, keeps Experience and About useful, and removes pages that repeat claims without adding evidence.
