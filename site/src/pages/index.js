import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

export default function Home() {
  return (
    <Layout
      title="Adam Pugh"
      description="Writer, technical writer, problem-solver, and practical builder"
    >
      <main style={{ padding: '3rem 1.5rem', maxWidth: '960px', margin: '0 auto' }}>
        <h1>Adam Pugh</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '760px' }}>
          Writer, technical writer, problem-solver, and practical builder.
        </p>

        <p style={{ maxWidth: '760px' }}>
          I like work that starts messy: scattered information, unclear workflows,
          evolving systems, awkward tools, and half-documented processes. I turn
          that kind of material into clearer help, better structure, and usable content.
        </p>

        <h2>What I do</h2>
        <ul>
          <li>Technical writing and help content</li>
          <li>Documentation cleanup and restructuring</li>
          <li>Procedural, reference, and support writing</li>
          <li>Information architecture and content organization</li>
          <li>Excel, reporting, and data-supported analysis</li>
          <li>Practical tool use and lightweight build work</li>
        </ul>

        <h2>Featured recent work</h2>
        <p>
          <strong>TeraCreators Help</strong> is a strong example of turning scattered,
          community-sourced knowledge into structured, navigable help content.
        </p>

        <p>
          <Link to="/docs/case-studies/teracreators-help">Read the case study</Link>
          {' · '}
          <a href="https://docadam.github.io/TeraCreators-Help/">View the live guide</a>
        </p>

        <h2>Explore</h2>
        <ul>
          <li><Link to="/docs/intro">Portfolio Docs</Link></li>
          <li><Link to="/docs/writing-samples/overview">Writing Samples</Link></li>
          <li><Link to="/docs/data-analytics/overview">Data &amp; Analytics</Link></li>
          <li><Link to="/docs/experience/overview">Experience</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </main>
    </Layout>
  );
}