import React from 'react';

const links = {
  CONFIG:
    'https://github.com/chrisrzhou/google-globe-trends/tree/master/src/config.js',
  GITHUB_REPO: 'https://github.com/chrisrzhou/google-globe-trends',
  GOOGLE_TRENDS_API: 'https://www.npmjs.com/package/google-trends-api',
  METOO: 'https://metoorising.withgoogle.com/',
  JAMSTACK: 'https://jamstack.org/',
  REACT_GLOBE_GITHUB: 'https://github.com/chrisrzhou/react-globe',
};

interface Props {
  value:
    | 'CONFIG'
    | 'GITHUB_REPO'
    | 'GOOGLE_TRENDS_API'
    | 'METOO'
    | 'JAMSTACK'
    | 'REACT_GLOBE_GITHUB';
  label: string;
}

function Link({ value, label }: Props): React.ReactElement {
  return (
    <a href={links[value]} rel="noopener noreferrer" target="_blank">
      {label}
    </a>
  );
}

export default Link;
