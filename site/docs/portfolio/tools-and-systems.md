---
title: "Documentation Engineering Tools and Systems"
description: "Authoring, publishing, analytics, and automation tools Adam Pugh uses to improve documentation systems and repeated workflows."
---

# Tools and Systems

I use tools to improve a documentation system, not to collect a longer skills list. The useful question is always: where is the friction, and what combination of structure, process, and tooling will make the work easier to maintain?

## The documentation system I work in

```text
source material + product change
              │
              ▼
     author and structure content
     Markdown · XML/DITA · CMS · page models
              │
              ▼
       review, publish, and deliver
     GitHub · Docusaurus · help systems · PDFs
              │
              ▼
       measure, govern, and improve
     Tableau · SQL · Excel · freshness tracking
              │
              ▼
      automate repeated work when it proves useful
     scripts · internal tools · AI-assisted workflows
```

Each layer affects the next. A clean authoring model makes review easier; reliable publishing makes content easier to trust; useful measurement shows where maintenance belongs; and automation is only worthwhile after the manual process is understood.

## Tool families

<div className="tool-map">
  <section className="tool-group">
    <h3>Authoring and structure</h3>
    <p>Creating content that can be reused, navigated, and maintained.</p>
    <div className="tool-chips">
      <span>Markdown</span><span>XML</span><span>DITA</span><span>HTML</span><span>CSS</span><span>oXygen XML Editor</span><span>Tridion Docs</span><span>Wiki and CMS environments</span>
    </div>
  </section>
  <section className="tool-group">
    <h3>Publishing and delivery</h3>
    <p>Making documentation available through predictable, versioned workflows.</p>
    <div className="tool-chips">
      <span>GitHub</span><span>VS Code</span><span>Docusaurus</span><span>GitHub Pages</span><span>Online help</span><span>PDFs</span><span>API guides</span>
    </div>
  </section>
  <section className="tool-group">
    <h3>Measurement and operations</h3>
    <p>Making documentation work visible enough to prioritize and improve.</p>
    <div className="tool-chips">
      <span>Excel</span><span>Power Query</span><span>Tableau</span><span>Power BI</span><span>SharePoint</span><span>Presto SQL</span><span>Documentation-health metrics</span>
    </div>
  </section>
  <section className="tool-group">
    <h3>Workflow automation</h3>
    <p>Reducing repeated work while preserving review, quality, and accountability.</p>
    <div className="tool-chips">
      <span>Scripts and templates</span><span>Internal web tools</span><span>AI-assisted workflows</span><span>Automated checks</span><span>Change monitoring</span><span>Diff triage</span>
    </div>
  </section>
</div>

## What that looks like in practice

| Need | What I have done |
| --- | --- |
| Make an evolving documentation environment easier to navigate | Reorganized and standardized high-traffic content, created page and terminology standards, and supported migrations to more structured systems. |
| Make operational work visible | Built tracking for 400+ products, seven automated Tableau dashboards, and SQL-backed documentation-health metrics. |
| Reduce recurring friction | Built documentation tooling and AI-assisted workflows around repeated review, change, governance, and task-management work. |
| Keep the system maintainable | Built a 234-page freshness-tracking system and used content governance to make maintenance work easier to identify and prioritize. |

The related case studies provide the evidence behind those examples: [Documentation Tooling and Automation](../case-studies/documentation-tooling-and-automation.md), [Analytics and Reporting](../case-studies/analytics-and-reporting.md), and [Migrations and Information Architecture](../case-studies/migrations-and-ia.md).

## A practical technical range

I am not a full-time software engineer, and I do not present myself as one. I am a documentation engineer who can work productively in technical environments: understand enough of the stack to improve the documentation, use data to find the real problem, and build or guide the right amount of tooling when the workflow warrants it.

This site is one public example: it uses [Docusaurus](https://docusaurus.io/), Markdown, GitHub, and static-site publishing to make a portfolio behave like documentation. For more on that decision, see [Personal Site](../projects/personal-site.md). For public build work, see [GitHub](https://github.com/DocAdam).

:::tip The standard I use

A tool earns its place when it improves clarity, consistency, speed, or maintainability for the people using the documentation system.

:::
