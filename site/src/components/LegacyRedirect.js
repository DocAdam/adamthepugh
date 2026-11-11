import React, {useEffect} from 'react';
import {useHistory, useLocation} from '@docusaurus/router';

const emptyFragmentMap = {};

export default function LegacyRedirect({to, fragmentMap = emptyFragmentMap}) {
  const history = useHistory();
  const location = useLocation();
  const [baseTo, defaultFragment = ''] = to.split('#');
  const sourceHash = location.hash || '';
  const targetHash = fragmentMap[sourceHash] || sourceHash || (defaultFragment ? `#${defaultFragment}` : '');
  const destination = `${baseTo}${location.search || ''}${targetHash}`;

  useEffect(() => {
    const currentHash = window.location.hash || sourceHash;
    const currentTargetHash = fragmentMap[currentHash] || currentHash || (defaultFragment ? `#${defaultFragment}` : '');
    history.replace(`${baseTo}${window.location.search || ''}${currentTargetHash}`);
  }, [baseTo, defaultFragment, fragmentMap, history, sourceHash]);

  return <p>This page moved. <a href={destination}>Continue to the current page.</a></p>;
}
