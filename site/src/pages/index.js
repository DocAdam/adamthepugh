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
          I work at the intersection of documentation, structure, analytics, and practical
          systems thinking. I like projects that start messy and need someone to figure out
          what matters, organize the information, and turn it into something people can use.
        </p>

        <h2>What I do</h2>
        <ul>
          <li>Technical writing and help content</li>
          <li>Documentation strategy and structure</li>
          <li>Content cleanup and information architecture</li>
          <li>Cross-functional documentation for complex systems</li>
          <li>Excel, Tableau, reporting, and documentation analytics</li>
          <li>Practical documentation tooling and lightweight build work</li>
        </ul>

        <h2>Featured recent work</h2>
        <p>
          <strong>TeraCreators Help</strong> is a recent example of turning scattered,
          community-sourced knowledge into structured, navigable help content.
        </p>

        <p>
          <Link to="/docs/case-studies/teracreators-help">Read the case study</Link>
          {' · '}
          <a href="https://docadam.github.io/TeraCreators-Help/">View the live guide</a>
        </p>

        <h2>Current focus</h2>
        <p style={{ maxWidth: '760px' }}>
          I currently work as a Documentation Engineer at Meta, creating and improving
          documentation for in-house Recruiting Management Software that supports the hiring
          lifecycle from sourcing to onboarding.
        </p>

        <h2>Explore</h2>
        <ul>
          <li><Link to="/docs/intro">Portfolio Docs</Link></li>
          <li><Link to="/docs/case-studies/overview">Case Studies</Link></li>
          <li><Link to="/docs/writing-samples/overview">Writing Samples</Link></li>
          <li><Link to="/docs/data-analytics/overview">Data &amp; Analytics</Link></li>
          <li><Link to="/docs/experience/overview">Experience</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </main>
    </Layout>
  );
}