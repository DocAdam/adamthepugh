---
title: "Euler Documentation Prototype"
description: "A public documentation proposal for making Euler's MCP, integrations, and product knowledge easier to find and use."
sidebar_label: "Euler documentation prototype"
hide_title: true
---

import Head from '@docusaurus/Head';

<Head>
  <title>Euler Documentation Prototype | Adam Pugh</title>
  <meta
    name="description"
    content="A public documentation proposal showing how Euler could turn its MCP and product knowledge into a clearer, maintainable documentation experience."
  />
</Head>

<div className="euler-proposal-hero">
  <p className="euler-eyebrow">Independent prototype · documentation system design</p>
  <h1>A documentation proposal for Euler</h1>
  <p className="euler-proposal-lede">I saw an opportunity to make Euler’s public MCP material easier to understand and use. I built a working demo to show how task context, prerequisites, and technical reference could fit together.</p>
  <p className="euler-proposal-links"><a href="https://docadam.github.io/docs-operating-system/euler/">View the working Euler prototype</a><span> · </span><a href="https://github.com/DocAdam/docs-operating-system">View the project source and overview</a><span> · </span><a href="#the-proposal">See the proposal</a></p>
</div>

## Why I created this proposal

I saw a gap between the technical detail in Euler’s public MCP material and the guidance someone would need to understand when and how to use it. I built this independent prototype from Euler’s public website and MCP materials to show a possible documentation approach.

## The useful thing already exists

Euler’s public MCP materials provide connection guidance, a structured tool catalog, access context, and a changelog. I focused the proposal on helping a customer or partner answer a few practical questions quickly:

<div className="content-grid">
  <section className="content-card"><h3>What can I do?</h3><p>I start with the outcome a person wants to achieve before showing the fields.</p></section>
  <section className="content-card"><h3>What do I need first?</h3><p>Put access, prerequisites, and safe setup steps before the contract details.</p></section>
  <section className="content-card"><h3>What comes back?</h3><p>Explain results, exceptions, and next steps in human language.</p></section>
  <section className="content-card"><h3>Who keeps this correct?</h3><p>Connect the public page to an owner, a source, and a change-review trigger.</p></section>
</div>

## What I found in the public material

The public [MCP reference](https://mcp.eulerapp.com/public/docs) and [structured manifest](https://mcp.eulerapp.com/public/docs.json) are useful source material. The issue is presentation: fields and their explanations can be densely wrapped together, which makes it harder to distinguish the purpose of a tool from its inputs, access limits, and outcomes.

I added a second layer around the technical detail: task context, readable examples, grouped inputs, plain-language results, and a route to troubleshooting.

## Alternatives I considered

| Alternative | Why I did not use it as the solution |
| --- | --- |
| Build a conventional help center from scratch | I used the available public sources to build a focused proposal that the company could review and extend. |
| Generate reference pages directly from the MCP manifest | I used the public MCP material as a source, then added a structure that explains purpose, prerequisites, and results. |
| Improve only the existing reference’s formatting | I changed the content structure and presentation to explain when to use a tool, what to prepare, and what to do next. |

These choices led to a working prototype built around the existing MCP material. It makes the proposed reading experience available for review while keeping the technical reference close at hand.

## The proposal

### 1. Give each tool a human-first reference page

I designed the first page to answer the question a person has before they open a schema.

<div className="euler-tool-model">
  <div><span>01</span><strong>Use this when</strong><p>The user outcome and the right time to use the tool.</p></div>
  <div><span>02</span><strong>Before you begin</strong><p>Connection, role, consent, or prerequisite information.</p></div>
  <div><span>03</span><strong>Ask it this way</strong><p>A plain-language example that reflects a real task.</p></div>
  <div><span>04</span><strong>What you get back</strong><p>Meaningful result fields, exceptions, and next steps.</p></div>
  <div><span>05</span><strong>Technical details</strong><p>I keep parameters, data types, and the contract close at hand after the task guidance.</p></div>
</div>

The prototype uses the public `list_accounts` material as an example: account access and consent context come first; the raw parameter table stays available for a builder who needs it.

### 2. Organize documentation around three reader needs

<div className="content-grid">
  <section className="content-card"><h3>Learn and launch</h3><p>Concepts, account connection, roles, access, terminology, and a safe first success.</p></section>
  <section className="content-card"><h3>Complete a task</h3><p>Outcome-led guides such as submit a referral, diagnose access, manage communications, or review fund requests.</p></section>
  <section className="content-card"><h3>Build and maintain</h3><p>MCP/API reference, integrations, errors, changes, migrations, and internal implementation playbooks.</p></section>
</div>

This is the same pattern I would use for product help, API quickstarts, integration guidance, release notes, and support content. I organize the content around the reader’s question instead of the implementation’s storage location.

### 3. Treat content as a maintained system

<div className="system-flow">Public website, schemas, product behavior, support evidence, and release changes
  → source record and provenance
  → normalized facts and review-required candidates
  → accountable validation
  → reusable canonical content
  → help center, reference, onboarding, support, and release communication</div>

I treat the content model, ownership map, and review process as the leverage point. Together, they keep help accurate after the next product change.

## The result: a working demo

The outcome is the [public Euler documentation demo](https://docadam.github.io/docs-operating-system/euler/). It shows the proposed content structure through connection guidance, tool reference examples, and a model for maintaining the content.

I delivered a concrete proposal that people can explore and assess. My next step would be to validate the content model with Euler’s product and engineering teams.

## Proposed next steps with the team

| Proposed first 30 days | Intended result |
| --- | --- |
| Inventory existing public, product, support, and engineering sources | A source-of-truth map, terminology baseline, and prioritized content backlog |
| Rework the highest-value MCP/tool references into the human-first pattern | A small, testable reference model rather than an abstract redesign |
| Build the connection and first-success path | A clearer route from setup to a usable result |
| Establish owners and change triggers | A lightweight way to prevent new content from going stale |

## The approach behind the prototype

I start by making the strange thing clear. I use the available evidence, separate what is confirmed from what needs review, and build a working content model before choosing a publishing platform or writing a large pile of pages.

I start with what the company already has: schemas, product workflows, support questions, changelogs, and customer language. I then turn those inputs into an organized system the product team can keep using.

<div className="euler-proposal-close">
  <strong>My goal is to make the right information easier to find, use, and maintain.</strong>
</div>

## Public sources reviewed

- [Euler website](https://eulerhq.com/)
- [Euler integrations](https://eulerhq.com/integrations)
- [Euler MCP reference](https://mcp.eulerapp.com/public/docs)
- [Euler MCP structured manifest](https://mcp.eulerapp.com/public/docs.json)
- [Euler MCP changelog](https://mcp.eulerapp.com/public/changelog)
- [Euler MCP connection guide](https://mcp.eulerapp.com/public/connect-claude)

## Project files

- [Documentation Operating System overview and source](https://github.com/DocAdam/docs-operating-system)
- [Published Euler prototype](https://docadam.github.io/docs-operating-system/euler/)
