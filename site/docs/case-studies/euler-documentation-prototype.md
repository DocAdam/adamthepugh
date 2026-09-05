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
  <p className="euler-eyebrow">Public working proposal · documentation system design</p>
  <h1>A documentation proposal for Euler</h1>
  <p className="euler-proposal-lede">I saw an opportunity to make Euler’s public MCP material easier to understand and use. I built a working demo to show how task context, prerequisites, and technical reference could fit together.</p>
  <p className="euler-proposal-links"><a href="https://docadam.github.io/docs-operating-system/euler/">View the working Euler prototype</a><span> · </span><a href="#the-proposal">See the proposal</a><span> · </span><a href="https://mcp.eulerapp.com/public/docs" target="_blank" rel="noreferrer">View Euler’s public MCP reference</a></p>
</div>

<div className="euler-boundary">
  <strong>What this is:</strong> a self-initiated portfolio prototype built from Euler’s public website and public MCP materials. It is not an official Euler property, product audit, or statement of internal plans. Product behavior, terminology, security guidance, and customer priorities would need validation with the responsible team.
</div>

## Why I created this proposal

I saw a gap between the technical detail in Euler’s public MCP material and the guidance someone would need to understand when and how to use it. I created this proposal independently as a possible solution for the company.

I worked from outside the company. The public website and MCP materials gave me a starting point, but I did not have the internal access needed to validate complete product guidance. That constraint shaped the scope of the demo.

## The useful thing already exists

Euler’s public MCP materials expose real capability: connection guidance, a structured tool catalog, access context, and a changelog. That is a strong starting point. The missing piece is not raw information. It is an experience that helps a customer or partner answer a few practical questions quickly:

<div className="content-grid">
  <section className="content-card"><h3>What can I do?</h3><p>Start with the outcome a person is trying to achieve, not a wall of fields.</p></section>
  <section className="content-card"><h3>What do I need first?</h3><p>Put access, prerequisites, and safe setup steps before the contract details.</p></section>
  <section className="content-card"><h3>What comes back?</h3><p>Explain results, exceptions, and next steps in human language.</p></section>
  <section className="content-card"><h3>Who keeps this correct?</h3><p>Connect the public page to an owner, a source, and a change-review trigger.</p></section>
</div>

## What I found in the public material

The public [MCP reference](https://mcp.eulerapp.com/public/docs) and [structured manifest](https://mcp.eulerapp.com/public/docs.json) are useful source material. The issue is presentation: fields and their explanations can be densely wrapped together, which makes it harder to distinguish the purpose of a tool from its inputs, access limits, and outcomes.

That is not a complaint about having technical detail. The detail matters. It needs a second layer around it: task context, readable examples, grouped inputs, plain-language results, and a route to troubleshooting.

## Alternatives I considered

| Alternative | Why I did not use it as the solution |
| --- | --- |
| Build a conventional help center from scratch | The public material could not support complete product guidance without internal access and validation. I limited the work to a proposal based on the sources available to me. |
| Generate reference pages directly from the MCP manifest | This could preserve the existing information order without adding task context. I used the public MCP material as a source and added a structure that explains purpose, prerequisites, and results. |
| Improve only the existing reference’s formatting | Better spacing and tables would not be enough to explain when to use a tool, what to prepare, or what to do next. I changed the content structure as well as its presentation. |

These choices led to a working prototype built around the existing MCP material. It makes the proposed reading experience available for review while keeping the technical reference close at hand.

## The proposal

### 1. Give each tool a human-first reference page

The first page should answer the question a person has before they open a schema.

<div className="euler-tool-model">
  <div><span>01</span><strong>Use this when</strong><p>The user outcome and the right time to use the tool.</p></div>
  <div><span>02</span><strong>Before you begin</strong><p>Connection, role, consent, or prerequisite information.</p></div>
  <div><span>03</span><strong>Ask it this way</strong><p>A plain-language example that reflects a real task.</p></div>
  <div><span>04</span><strong>What you get back</strong><p>Meaningful result fields, exceptions, and next steps.</p></div>
  <div><span>05</span><strong>Technical details</strong><p>Parameters, data types, and the contract—close at hand, not first.</p></div>
</div>

The prototype uses the public `list_accounts` material as an example: account access and consent context come first; the raw parameter table stays available for a builder who needs it.

### 2. Organize documentation around three reader needs

<div className="content-grid">
  <section className="content-card"><h3>Learn and launch</h3><p>Concepts, account connection, roles, access, terminology, and a safe first success.</p></section>
  <section className="content-card"><h3>Complete a task</h3><p>Outcome-led guides such as submit a referral, diagnose access, manage communications, or review fund requests.</p></section>
  <section className="content-card"><h3>Build and maintain</h3><p>MCP/API reference, integrations, errors, changes, migrations, and internal implementation playbooks.</p></section>
</div>

This is the same pattern I would use for product help, API quickstarts, integration guidance, release notes, and support content. The reader starts where their question starts—not where the implementation happens to be stored.

### 3. Treat content as a maintained system

<div className="system-flow">Public website, schemas, product behavior, support evidence, and release changes
  → source record and provenance
  → normalized facts and review-required candidates
  → accountable validation
  → reusable canonical content
  → help center, reference, onboarding, support, and release communication</div>

For a first technical writer, this is the leverage point. A good article helps once. A content model, ownership map, and review process keep help accurate after the next product change.

## The result: a working demo

The outcome is the [public Euler documentation demo](https://docadam.github.io/docs-operating-system/euler/). It shows the proposed content structure through connection guidance, tool reference examples, and a model for maintaining the content.

This is the deliverable from the project: a concrete proposal that people can explore and assess. Customer adoption and results after a product release are not established by this demo. Validation with Euler’s product and engineering teams would be a next step.

## Proposed next steps with the team

| Proposed first 30 days | Intended result |
| --- | --- |
| Inventory existing public, product, support, and engineering sources | A source-of-truth map, terminology baseline, and prioritized content backlog |
| Rework the highest-value MCP/tool references into the human-first pattern | A small, testable reference model rather than an abstract redesign |
| Build the connection and first-success path | A clearer route from setup to a usable result |
| Establish owners and change triggers | A lightweight way to prevent new content from going stale |

## The approach behind the prototype

I start by making the strange thing clear. I use the available evidence, separate what is confirmed from what needs review, and build a working content model before choosing a publishing platform or writing a large pile of pages.

That means a documentation function can begin with what the company already has—schemas, product workflows, support questions, changelogs, and customer language—then turn those inputs into an organized system the product team can keep using.

<div className="euler-proposal-close">
  <strong>The point is not to make docs look finished.</strong>
  <p>It is to make the right information easier to find, easier to use, and easier for the next person to maintain.</p>
</div>

## Public sources reviewed

- [Euler website](https://eulerhq.com/)
- [Euler integrations](https://eulerhq.com/integrations)
- [Euler MCP reference](https://mcp.eulerapp.com/public/docs)
- [Euler MCP structured manifest](https://mcp.eulerapp.com/public/docs.json)
- [Euler MCP changelog](https://mcp.eulerapp.com/public/changelog)
- [Euler MCP connection guide](https://mcp.eulerapp.com/public/connect-claude)
