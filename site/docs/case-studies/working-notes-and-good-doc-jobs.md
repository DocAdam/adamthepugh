---
title: "Working Notes and Good Doc Jobs"
description: "How I use publishing, automated content audits, a public job database, and an open data pipeline to support technical communicators."
sidebar_label: "Working Notes and Good Doc Jobs"
---

# Working Notes and Good Doc Jobs

<p className="status-label">Active independent project</p>

**Role:** Creator, Documentation Engineer, and Data Curator<br />
**Status:** Active and ongoing (launched 2026)<br />
**Audience:** Technical communicators and documentation job seekers

[Working Notes](https://docadam.substack.com/) is my practitioner publication. [Good Doc Jobs](https://docs.google.com/spreadsheets/d/1rECWXCGhDKUiB3-LIwEEe1teaPWaGxgSK28AZADFF4g/edit?usp=sharing) is the reader-facing database. [Public Job Feed](https://github.com/DocAdam/public-job-feed) is the source pipeline and data project that supports the database. Together, these projects connect technical writing, data curation, and practical automation.

## The problems

Technical communicators must often search several job boards, remove repeated records, and check whether links still work. Large public websites can also contain spelling errors that manual reviews do not find.

## What I built

| Component | Purpose |
| --- | --- |
| Working Notes | Publishes audit results, job roundups, project methods, and practical essays. |
| Good Doc Jobs | Gives readers a structured and filterable list of documentation and related jobs without a signup requirement. |
| Public Job Feed | Collects source records, saves review evidence, checks records, and produces data for publication. |
| Content-audit scripts | Check sets of public web pages and produce findings for human review. |

Good Doc Jobs is the public reading and filtering experience. Public Job Feed is the data and review system behind that experience. This separation lets me improve the source process without changing how readers use the list.

## Automated content audits

I designed and used spelling-audit scripts to review public websites. The published [Grammarly audit](https://docadam.substack.com/p/everyone-needs-an-editor-grammarly) and [Unity audit](https://docadam.substack.com/p/everyone-needs-an-editor-unity) show selected production errors and the evidence for each finding.

These are focused spelling audits. They are not complete quality reviews of the websites.

## Job data and publication

I designed and maintain [Good Doc Jobs](https://docs.google.com/spreadsheets/d/1rECWXCGhDKUiB3-LIwEEe1teaPWaGxgSK28AZADFF4g/edit?usp=sharing) as a free public database. I connect the database to job roundups on [Working Notes](https://docadam.substack.com/). I explain the spreadsheet method in [Just a Spreadsheet](https://docadam.substack.com/p/just-a-spreadsheet).

The [Public Job Feed repository](https://github.com/DocAdam/public-job-feed) records the source and processing work. It supports collection, review, validation, and publication without making the public spreadsheet carry the full operating history.

## Information architecture and systems thinking

Working Notes gives me a place to publish practical methods for documentation problems. These methods include ways to turn unstructured sources, such as community discussions, into organized and searchable documentation.

## Skills demonstrated

- **Documentation engineering:** Automated spelling checks, validation steps, and docs-as-code practices.
- **Data curation:** Record structure, review rules, filters, and public delivery.
- **Technical communication:** Evidence-based audit writing, practitioner articles, job summaries, and clear source limits.

## Evidence boundary

Good Doc Jobs is a maintained list. It does not guarantee that an employer still accepts applications. Public Job Feed saves source and review evidence, but its records can contain unknown or changing details. The content audits use public pages and report selected findings.

## Project links

- [Read Working Notes](https://docadam.substack.com/)
- [Browse Good Doc Jobs](https://docs.google.com/spreadsheets/d/1rECWXCGhDKUiB3-LIwEEe1teaPWaGxgSK28AZADFF4g/edit?usp=sharing)
- [View Public Job Feed](https://github.com/DocAdam/public-job-feed)
- [Read the Grammarly audit](https://docadam.substack.com/p/everyone-needs-an-editor-grammarly)
- [Read the Unity audit](https://docadam.substack.com/p/everyone-needs-an-editor-unity)
- [Read Just a Spreadsheet](https://docadam.substack.com/p/just-a-spreadsheet)
