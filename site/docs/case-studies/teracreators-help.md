---
title: "TeraCreators Help Documentation Project"
description: "How a gameplay bug led to a community help project: organizing scattered answers, explaining player terminology, and building guides in gameplay order."
---

# TeraCreators Help

[TeraCreators Help](https://docadam.github.io/TeraCreators-Help/) started when I needed to report a bug I noticed while playing. Looking for a way to report it exposed a broader documentation need: players kept asking about unfamiliar terms, and experienced members kept directing them back to the same questions and answers.

I built the guide as a player and contributor who saw a need. It grew into a public help site covering five games.

## The problem I noticed

As I investigated the bug, I noticed other gameplay issues and recurring questions. Experienced players used terms that newer players needed explained. Useful answers existed, but they were spread across Discord conversations, company documents, and other reference material.

I wanted to bring that information together and organize it around the order in which people play. A player could then find guidance for their current stage and understand the terms used to explain it.

## The first approach and its limits

I first tried collecting the Discord content through copying and pasting. That was too difficult to sustain. I found [Discrub](https://github.com/prathercc/discrub-ext), a Discord message export tool, to help collect messages about recurring user issues, links, and images.

The extracted material was a starting point for the guides. I still needed to organize it in gameplay order, explain the terminology, and connect written instructions with visual examples.

## How I assembled the guides

I incorporated documents from the company alongside knowledge scattered through the community. I took screenshots of my own gameplay and extracted others from examples submitted by users.

My contribution was bringing those sources together and organizing the content in gameplay order. The source material included work from the company and other players; the guide gave it a shared structure.

## The transformation

<pre className="system-flow">community discussion, screenshots, and reference material
    │
    ▼
identify stable questions and repeatable content types
    │
    ▼
create a navigable help structure and page models
    │
    ▼
publish, refine, and maintain the guide in public</pre>

## What I built

<div className="content-grid">
  <section className="content-card"><h3>Multi-guide architecture</h3><p>One documentation system that can support distinct game ecosystems without collapsing them into one loose collection.</p></section>
  <section className="content-card"><h3>Repeatable page models</h3><p>Structured categories for guides, reference information, visual help, and common questions.</p></section>
  <section className="content-card"><h3>Documentation UX</h3><p>Navigation and page structure designed around what players are trying to understand or do.</p></section>
  <section className="content-card"><h3>Docs-as-code workflow</h3><p>Docusaurus, Markdown, GitHub, and static publishing for a maintainable public guide.</p></section>
</div>

## Content decisions

| Challenge | Documentation decision |
| --- | --- |
| Players needed help at different stages | Organize the content in gameplay order so the guide follows their progress. |
| Experienced players used unfamiliar terms | Include explanations of the terms used in community guidance. |
| Members repeatedly linked to the same answers | Bring recurring guidance into a central set of pages that people can browse and link to. |
| Written guidance needed visual context | Use screenshots from my own gameplay and user-submitted examples alongside the instructions. |
| Useful material came from several sources | Incorporate company documents and community knowledge into a shared guide structure. |

## Publication and community response

I published the guide and shared it with the Discord community. Members responded positively, and the company gave me the Tera Helper role in recognition of my knowledge and contributions.

## A later revision: rescue navigation

On April 15, 2026, I updated the Havoc Hotel 3 rescue guide with direct links from the location list to each location section. I also clarified the Safe Room and Exit Tunnel headings so they matched the list labels. Readers could then select a location and jump to its instructions and screenshots.

The [recorded change](https://github.com/DocAdam/TeraCreators-Help/commit/e4ad6e9) shows the navigation before and after the revision.

- [View the live guide](https://docadam.github.io/TeraCreators-Help/)
- [See the project on GitHub](https://github.com/DocAdam/TeraCreators-Help)
