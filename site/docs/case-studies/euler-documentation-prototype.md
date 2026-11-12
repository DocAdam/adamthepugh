---
slug: /work/euler-documentation-prototype
title: "Euler documentation prototype"
description: "An independent prototype that shows how Euler's public MCP material could support clearer task guidance and maintained reference content."
sidebar_label: "Euler documentation prototype"
---

<p className="status-label">Independent prototype</p>

<a href="https://docadam.github.io/docs-operating-system/euler/" target="_blank" rel="noopener noreferrer">View the working prototype ↗</a> or <a href="https://github.com/DocAdam/docs-operating-system" target="_blank" rel="noopener noreferrer">view the project source on GitHub ↗</a>.

## Why I built it

Euler's public MCP material contains connection guidance, a tool catalog, access information, and a changelog. I used those sources to build a working model that shows how task context, prerequisites, technical reference, and maintenance information could work together. Each source is linked below.

## The documentation problem

The public <a href="https://mcp.eulerapp.com/public/docs" target="_blank" rel="noopener noreferrer">MCP reference ↗</a> and <a href="https://mcp.eulerapp.com/public/docs.json" target="_blank" rel="noopener noreferrer">structured manifest ↗</a> contain useful source material. Dense presentation can make it difficult to separate a tool's purpose from its inputs, access limits, and results.

I added a documentation layer around the technical detail. It includes task context, readable examples, grouped inputs, plain-language results, and a route to troubleshooting.

## Questions the prototype answers

- What can I do with this tool?
- What access, consent, or setup do I need first?
- How can I ask for the result?
- What does the result mean?
- Who owns the source, and what product change must trigger a review?

## Alternatives I considered

| Alternative | Decision |
| --- | --- |
| Build a new help center from scratch | I used the public sources as the technical authority for the prototype. |
| Generate reference pages directly from the manifest | I kept the manifest as a source and added purpose, prerequisites, results, and examples. |
| Focus on reference formatting | I changed the content structure so that readers can understand when to use a tool and what to do next. |

## Proposed tool page model

1. **Use this when:** State the user outcome and when the tool is appropriate.
2. **Before you begin:** State the connection, role, consent, and prerequisite information.
3. **Ask it this way:** Give a plain-language example based on a user task.
4. **What you get back:** Explain result fields, exceptions, and next steps.
5. **Technical details:** Keep parameters, data types, and the contract near the task guidance.

The prototype uses the public `list_accounts` material as an example. It puts account access and consent before the parameter table.

## Proposed documentation structure

### Learn and launch

Explain concepts, account connections, roles, access, terminology, and the first successful task.

### Complete a task

Provide guides for outcomes such as submitting a referral, diagnosing access, managing communications, and reviewing fund requests.

### Build and maintain

Keep MCP and API reference, integrations, errors, changes, migrations, and internal implementation guidance together.

## Maintenance model

The proposed system connects public pages to source records, owners, and review triggers. Product behavior, schemas, support evidence, and release changes feed a review process. Approved content can then support reference pages, onboarding, troubleshooting, and release communication.

## What the prototype shows

The <a href="https://docadam.github.io/docs-operating-system/euler/" target="_blank" rel="noopener noreferrer">public working prototype ↗</a> combines connection guidance, tool reference examples, and a proposed maintenance model in one system that people can explore.

## Proposed first steps

| Work | Proposed result |
| --- | --- |
| Inventory public, product, support, and engineering sources | Source map, terminology list, and prioritized backlog |
| Apply the tool page model to the highest-value references | Small reference set for review and testing |
| Build the connection and first-success path | Clear route from setup to a usable result |
| Assign owners and change triggers | Review process that helps prevent stale content |

## Public sources reviewed

- <a href="https://eulerhq.com/" target="_blank" rel="noopener noreferrer">Euler website ↗</a>
- <a href="https://eulerhq.com/integrations" target="_blank" rel="noopener noreferrer">Euler integrations ↗</a>
- <a href="https://mcp.eulerapp.com/public/docs" target="_blank" rel="noopener noreferrer">Euler MCP reference ↗</a>
- <a href="https://mcp.eulerapp.com/public/docs.json" target="_blank" rel="noopener noreferrer">Euler MCP structured manifest ↗</a>
- <a href="https://mcp.eulerapp.com/public/changelog" target="_blank" rel="noopener noreferrer">Euler MCP changelog ↗</a>
- <a href="https://mcp.eulerapp.com/public/connect-claude" target="_blank" rel="noopener noreferrer">Euler MCP connection guide ↗</a>

## Project files

- <a href="https://github.com/DocAdam/docs-operating-system" target="_blank" rel="noopener noreferrer">Documentation Operating System source and overview ↗</a>
- <a href="https://docadam.github.io/docs-operating-system/euler/" target="_blank" rel="noopener noreferrer">Published Euler prototype ↗</a>
