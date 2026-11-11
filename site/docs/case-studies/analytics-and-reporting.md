---
slug: /work/documentation-analytics
title: "Analytics and reporting"
description: "A 2022 Meta documentation analytics system that reduced reporting effort and made team work visible."
---

# Analytics and reporting

**Context:** Meta, Documentation Engineering Manager, 2022<br />
**Audience:** Documentation managers, team members, and operating partners

The department was assigned documentation responsibility for more than 400 internal Enterprise Engineering products. Their documentation wikis contained thousands of pages. A Google Doc tracked the transition work, but it did not give leaders a consistent view of status, dates, risks, and results.

## What I built

I extracted the product names from the Google Doc and created a SharePoint tracking database. Writers used it to record status, start dates, end dates, and other project information for documentation work across more than 400 products.

I connected the SharePoint data and other corporate work data to Tableau. I personally created seven automated dashboards with department, project, completed-work, and manager views. My senior manager used the reports to show project status and risks to her director.

<span id="the-analytics-model"></span>
<span id="method"></span>

## How I built the reporting system

<figure className="process-visual">
  <picture>
    <source media="(max-width: 640px)" srcSet="/img/process/analytics-reporting-system-mobile.svg" />
    <img src="/img/process/analytics-reporting-system.svg" alt="Corporate work data, a product list, and writer updates move through a SharePoint tracking database and shared measures into seven role-based Tableau dashboards used for operations reviews and planning." loading="lazy" decoding="async" width="1200" height="660" />
  </picture>
  <figcaption><strong>From records to decisions.</strong> I built the tracking and reporting system that connected operational records, consistent measures, role-based dashboards, and management use.</figcaption>
</figure>

## Dashboard examples

These 2022 Tableau views show two parts of the reporting system. The migration dashboards showed status and completion by team and team group. The work-progress tracker used the SharePoint records to give the team a consistent view of documentation requests for monthly reporting.

<div className="analytics-gallery">
  <figure className="analytics-gallery__item">
    <a className="analytics-gallery__image-link" href="/img/documentation-analytics/ep-docs-migration-metrics.png" aria-label="Open the full-size migration activity dashboard">
      <img className="analytics-gallery__image" src="/img/documentation-analytics/ep-docs-migration-metrics.png" alt="Tableau dashboard that shows documentation migration activity by date and team group" loading="lazy" decoding="async" width="2048" height="1536" />
    </a>
    <figcaption><strong>Migration activity.</strong> This view shows completed migrations by date and team group. <a href="/img/documentation-analytics/ep-docs-migration-metrics.png">View full size.</a></figcaption>
  </figure>

  <figure className="analytics-gallery__item">
    <a className="analytics-gallery__image-link" href="/img/documentation-analytics/ep-docs-work-progress-tracker.png" aria-label="Open the full-size documentation work-progress dashboard">
      <img className="analytics-gallery__image" src="/img/documentation-analytics/ep-docs-work-progress-tracker.png" alt="Tableau dashboard that organizes documentation requests by progress and team group" loading="lazy" decoding="async" width="2032" height="1928" />
    </a>
    <figcaption><strong>Work-request progress.</strong> This view organizes documentation requests by status and team group for monthly reporting. <a href="/img/documentation-analytics/ep-docs-work-progress-tracker.png">View full size.</a></figcaption>
  </figure>

  <figure className="analytics-gallery__item">
    <a className="analytics-gallery__image-link" href="/img/documentation-analytics/ep-documentation-migration-metrics.png" aria-label="Open the full-size documentation migration status dashboard">
      <img className="analytics-gallery__image" src="/img/documentation-analytics/ep-documentation-migration-metrics.png" alt="Tableau dashboard with migration status, product life-cycle categories, page reduction, and completion dates" loading="lazy" decoding="async" width="2023" height="1105" />
    </a>
    <figcaption><strong>Migration status.</strong> This view combines status, product life-cycle categories, page reduction, and completion dates. <a href="/img/documentation-analytics/ep-documentation-migration-metrics.png">View full size.</a></figcaption>
  </figure>

  <figure className="analytics-gallery__item">
    <a className="analytics-gallery__image-link" href="/img/documentation-analytics/team-group-migrations.png" aria-label="Open the full-size team-group migration dashboard">
      <img className="analytics-gallery__image" src="/img/documentation-analytics/team-group-migrations.png" alt="Tableau dashboard that compares migration status across product life-cycle groups" loading="lazy" decoding="async" width="2048" height="1536" />
    </a>
    <figcaption><strong>Team-group progress.</strong> This view compares completed, in-progress, on-hold, and remaining migrations. <a href="/img/documentation-analytics/team-group-migrations.png">View full size.</a></figcaption>
  </figure>
</div>

These images are dated operational snapshots. Their totals reflect the selected dates and filters. See [Migrations and information architecture](/work/documentation-migrations/) for the final full-program totals and outcomes.

<span id="where-the-work-helps"></span>

## Supported use and results

- Documentation accomplishment reporting changed from several hours of preparation to less than two minutes per entry.
- The dashboards had 735 views from 39 active users.
- Teams used the dashboards in 11 operations reviews per month and in performance discussions.
- Managers could use consistent measures instead of separate manual reports.
