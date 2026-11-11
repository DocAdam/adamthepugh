import React, {useEffect, useState} from 'react';

const PROFILE_URL = 'https://github.com/DocAdam';
const EVENTS_URL = 'https://api.github.com/users/DocAdam/events/public?per_page=100';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

function repositoryName(event) {
  return event.repo?.name?.replace(/^DocAdam\//, '') || 'GitHub';
}

function eventDescription(event) {
  const repository = repositoryName(event);

  if (event.type === 'PushEvent') return `Pushed changes to ${repository}`;
  if (event.type === 'PullRequestEvent') {
    const action = event.payload?.action === 'opened' ? 'Opened' : 'Updated';
    return `${action} a pull request in ${repository}`;
  }
  if (event.type === 'CreateEvent') return `Created work in ${repository}`;
  return `Updated ${repository}`;
}

function eventUrl(event) {
  if (event.type === 'PullRequestEvent' && event.payload?.pull_request?.html_url) {
    return event.payload.pull_request.html_url;
  }
  return `https://github.com/${event.repo.name}`;
}

export default function GitHubActivity() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();

    async function loadActivity() {
      try {
        const response = await fetch(EVENTS_URL, {
          headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
          },
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`GitHub returned ${response.status}`);

        const publicEvents = await response.json();
        const recentEvents = publicEvents
          .filter((event) => ['PushEvent', 'PullRequestEvent', 'CreateEvent'].includes(event.type))
          .slice(0, 4);

        setEvents(recentEvents);
        setStatus('ready');
      } catch (error) {
        if (error.name !== 'AbortError') setStatus('unavailable');
      }
    }

    loadActivity();
    return () => controller.abort();
  }, []);

  return (
    <section className="github-activity" aria-labelledby="github-activity-title">
      <div className="github-activity__intro">
        <svg className="github-activity__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M12 .8a11.4 11.4 0 0 0-3.6 22.2c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17 4.7 18 5 18 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.8 5.4-5.4 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.4 11.4 0 0 0 12 .8Z" />
        </svg>
        <div>
          <p className="status-label">Live public record</p>
          <h3 id="github-activity-title">Recent GitHub activity</h3>
          <p>Commits, branches, and pull requests appear here when they are available in GitHub's public activity feed.</p>
        </div>
      </div>

      <div className="github-activity__feed" aria-live="polite">
        {status === 'loading' && <p className="github-activity__status">Loading public activity from GitHub…</p>}
        {status === 'ready' && events.length === 0 && (
          <p className="github-activity__status">No recent public events are available in the feed.</p>
        )}
        {status === 'ready' && events.length > 0 && (
          <ul className="github-activity__events">
            {events.map((event) => (
              <li key={event.id}>
                <a href={eventUrl(event)}>{eventDescription(event)}</a>
                <time dateTime={event.created_at}>{dateFormatter.format(new Date(event.created_at))}</time>
              </li>
            ))}
          </ul>
        )}
        {status === 'unavailable' && (
          <p className="github-activity__status">The live activity feed is not available. The GitHub profile has the current public record.</p>
        )}
      </div>

      <a className="github-activity__link" href={PROFILE_URL}>View current activity on GitHub <span aria-hidden="true">→</span></a>
    </section>
  );
}
