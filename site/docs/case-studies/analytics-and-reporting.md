---
slug: /work/documentation-analytics
title: "Documentation analytics and reporting"
description: "A 2022 Meta documentation analytics system that reduced reporting effort and made team work visible."
---

# Documentation analytics and reporting

**Context:** Meta, Documentation Engineering Manager, 2022<br />
**Audience:** Documentation managers, team members, and operating partners

The department was assigned documentation responsibility for more than 400 internal Enterprise Engineering products. Their documentation wikis contained thousands of pages. A Google Doc tracked the transition work, but it did not give leaders a consistent view of status, dates, risks, and results.

## What I built

I extracted the product names from the Google Doc and created a SharePoint tracking database. Writers used it to record status, start dates, end dates, and other project information for documentation work across more than 400 products.

I connected the SharePoint data and other corporate work data to Tableau. I personally created seven automated dashboards with department, project, completed-work, and manager views. My senior manager used the reports to show project status and risks to her director.

<span id="where-the-work-helps"></span>

## Supported use and results

- Documentation accomplishment reporting changed from several hours of preparation to less than two minutes per entry.
- The dashboards had 735 views from 39 active users.
- Teams used the dashboards in 11 operations reviews per month and in performance discussions.
- Managers could use consistent measures instead of separate manual reports.

<span id="the-analytics-model"></span>

## Method

<pre className="system-flow">corporate work data and SharePoint records
    │
    ▼
defined documentation measures
    │
    ▼
role-based Tableau dashboards
    │
    ▼
operations reviews and planning decisions</pre>
