import React, {useCallback, useRef} from 'react';
import {useHistory} from '@docusaurus/router';
import {translate} from '@docusaurus/Translate';
import {SkipToContentFallbackId} from '@docusaurus/theme-common';
import {useLocationChange} from '@docusaurus/theme-common/internal';
import styles from './styles.module.css';

const label = translate({
  id: 'theme.common.skipToMainContent',
  description: 'The skip to content label for keyboard navigation',
  message: 'Skip to main content',
});

function getTarget() {
  return (
    document.querySelector('main:first-of-type') ??
    document.getElementById(SkipToContentFallbackId)
  );
}

function focusTarget(element) {
  element.setAttribute('tabindex', '-1');
  element.focus();
}

export default function SkipToContent() {
  const containerRef = useRef(null);
  const {action} = useHistory();

  const onClick = useCallback((event) => {
    event.preventDefault();
    const target = getTarget();
    if (target) focusTarget(target);
  }, []);

  useLocationChange(({location}) => {
    if (containerRef.current && !location.hash && action === 'PUSH') {
      focusTarget(containerRef.current);
    }
  });

  return (
    <div ref={containerRef} role="region" aria-label={label}>
      <a
        className={styles.skipToContent}
        href={`#${SkipToContentFallbackId}`}
        onClick={onClick}>
        {label}
      </a>
    </div>
  );
}
