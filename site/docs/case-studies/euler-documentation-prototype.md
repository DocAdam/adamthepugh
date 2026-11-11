---
title: "Euler documentation prototype"
description: "An independent prototype that shows how Euler's public MCP material could support clearer task guidance and maintained reference content."
sidebar_label: "Euler documentation prototype"
---

<p className="status-label">Independent prototype</p>

[View the working prototype](https://docadam.github.io/docs-operating-system/euler/) or [view the project source](https://github.com/DocAdam/docs-operating-system).

## Why I built it

Euler's public MCP material contains connection guidance, a tool catalog, access information, and a changelog. I built this independent prototype to show how task context, prerequisites, technical reference, and maintenance information could work together.

Euler did not commission or review this work. I used only public material.

## The documentation problem

The public [MCP reference](https://mcp.eulerapp.com/public/docs) and [structured manifest](https://mcp.eulerapp.com/public/docs.json) contain useful source material. Dense presentation can make it difficult to separate a tool's purpose from its inputs, access limits, and results.

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
| Build a new help center without using existing material | I used the public sources as the technical authority for the prototype. |
| Generate reference pages directly from the manifest | I kept the manifest as a source and added purpose, prerequisites, results, and examples. |
| Change only the reference formatting | I changed the content structure so that readers can understand when to use a tool and what to do next. |

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

## Result and limits

The result is a [public working prototype](https://docadam.github.io/docs-operating-system/euler/) that people can explore and assess. It shows connection guidance, tool reference examples, and a proposed maintenance model.

The outcomes on this page are proposals. Product and engineering teams would need to validate the content model, access guidance, terminology, and ownership process before production use.

## Proposed first steps

| Work | Proposed result |
| --- | --- |
| Inventory public, product, support, and engineering sources | Source map, terminology list, and prioritized backlog |
| Apply the tool page model to the highest-value references | Small reference set for review and testing |
| Build the connection and first-success path | Clear route from setup to a usable result |
| Assign owners and change triggers | Review process that helps prevent stale content |

## Public sources reviewed

- [Euler website](https://eulerhq.com/)
- [Euler integrations](https://eulerhq.com/integrations)
- [Euler MCP reference](https://mcp.eulerapp.com/public/docs)
- [Euler MCP structured manifest](https://mcp.eulerapp.com/public/docs.json)
- [Euler MCP changelog](https://mcp.eulerapp.com/public/changelog)
- [Euler MCP connection guide](https://mcp.eulerapp.com/public/connect-claude)

## Project files

- [Documentation Operating System source and overview](https://github.com/DocAdam/docs-operating-system)
- [Published Euler prototype](https://docadam.github.io/docs-operating-system/euler/)
