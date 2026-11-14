---
slug: /work/good-doc-jobs
title: "Good Doc Jobs"
description: "A free database of technical writing and documentation-related jobs, supported by a public source, review, and publication pipeline."
sidebar_label: "Good Doc Jobs"
---

import Head from '@docusaurus/Head';

<Head>
  <script type="application/ld+json">{JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    '@id': 'https://adamthepugh.com/work/good-doc-jobs/#dataset',
    name: 'Good Doc Jobs',
    description: 'A free, reader-facing database that helps technical communicators find and review relevant job opportunities.',
    url: 'https://adamthepugh.com/work/good-doc-jobs/',
    creator: {
      '@type': 'Person',
      '@id': 'https://adamthepugh.com/#person',
      name: 'Adam Pugh',
      alternateName: 'DocAdam',
      url: 'https://adamthepugh.com/',
    },
    keywords: [
      'technical writing jobs',
      'documentation jobs',
      'documentation engineering jobs',
      'technical communication jobs',
    ],
    isAccessibleForFree: true,
    distribution: {
      '@type': 'DataDownload',
      encodingFormat: 'text/csv',
      contentUrl: 'https://docs.google.com/spreadsheets/d/1rECWXCGhDKUiB3-LIwEEe1teaPWaGxgSK28AZADFF4g/gviz/tq?tqx=out:csv&sheet=DataDownload',
    },
  })}</script>
</Head>

# Good Doc Jobs

<p className="status-label">Active open-data product</p>

**Role:** Creator, Documentation Engineer, and Data Curator<br />
**Status:** Active and ongoing (launched 2026)<br />
**Audience:** Technical communicators and documentation job seekers

I built <a href="https://docs.google.com/spreadsheets/d/1rECWXCGhDKUiB3-LIwEEe1teaPWaGxgSK28AZADFF4g/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Good Doc Jobs ↗</a> as a free, reader-facing database of technical writing and documentation-related jobs. I built <a href="https://github.com/DocAdam/public-job-feed" target="_blank" rel="noopener noreferrer">Public Job Feed ↗</a> as the source and review system behind it.

## The problem

Technical communicators must often search several job boards, remove repeated records, compare incomplete details, and check whether links still work. A useful public list must stay simple for readers while the source process keeps enough evidence for review and maintenance.

## What I built

| Component | Purpose |
| --- | --- |
| Good Doc Jobs | Gives readers a structured and filterable public list without a signup requirement. |
| Public Job Feed | Collects source records, saves review evidence, checks records, and prepares data for publication. |
| Working Notes | Publishes selected job roundups and explains project methods for readers. |

Good Doc Jobs is the public reading and filtering experience. Public Job Feed keeps the source, review, validation, and publication work separate from that experience. This structure lets me improve the operating process without adding that complexity to the reader-facing list.

## Source-to-publication workflow

<ol className="project-steps">
  <li><strong>Collect.</strong><span>Save direct employer records and source details.</span></li>
  <li><strong>Review.</strong><span>Check role fit, location, pay, restrictions, and source status.</span></li>
  <li><strong>Validate.</strong><span>Check structure, repeated records, links, and publication files.</span></li>
  <li><strong>Publish.</strong><span>Prepare the simple public list and selected reader-facing summaries.</span></li>
</ol>

## Weekly reporting

I created weekly reporting views to track saved entries, additions, removals, and work-location groups. This example captures the project view from November 9, 2026.

<div className="publication-gallery publication-gallery--single">
  <figure className="publication-gallery__item publication-gallery__item--wide">
    <a className="publication-gallery__image-link" href="/img/working-notes/good-doc-jobs-weekly-metrics.png" aria-label="Open the full-size Good Doc Jobs weekly metrics graphic">
      <img className="publication-gallery__image publication-gallery__image--dashboard" src="/img/working-notes/good-doc-jobs-weekly-metrics.png" alt="Good Doc Jobs weekly metrics dashboard dated November 9, 2026, with 767 saved entries and location counts" loading="lazy" decoding="async" width="1405" height="918" />
    </a>
    <figcaption><strong>Weekly metrics.</strong> This view brings saved entries, weekly changes, and location groups into one report for publication planning.</figcaption>
  </figure>
</div>

## How I maintain the list

Public Job Feed saves the source URL, review evidence, and last known status for each record. I use those fields to update the public list, revisit incomplete details, and recheck links as conditions change.

<a href="https://docs.google.com/spreadsheets/d/1rECWXCGhDKUiB3-LIwEEe1teaPWaGxgSK28AZADFF4g/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Browse Good Doc Jobs ↗</a>, <a href="https://github.com/DocAdam/public-job-feed" target="_blank" rel="noopener noreferrer">view Public Job Feed on GitHub ↗</a>, or <a href="https://docadam.substack.com/p/just-a-spreadsheet" target="_blank" rel="noopener noreferrer">read how I designed the public spreadsheet ↗</a>.
