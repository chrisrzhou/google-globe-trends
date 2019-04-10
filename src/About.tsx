import React from 'react';

import Blur from './Blur';
import Button from './Button';
import Link from './Link';

interface Props {
  onHide: () => void;
  shown: boolean;
}

function About({ onHide, shown }: Props): React.ReactElement {
  return (
    <Blur className="about" shown={shown}>
      <div className="about-content">
        <h1>About</h1>
        <p>
          <Link value="GITHUB_REPO" label="Google Globe Trends" /> is a{' '}
          <Link value="JAMSTACK" label="Jamstack" /> application built without
          any server components. Data is fetched during build time using the{' '}
          <Link value="GOOGLE_TRENDS_API" label="google-trends-api" /> library.
          Globe visualizations are rendered using the{' '}
          <Link value="REACT_GLOBE_GITHUB" label="react-globe" /> component.
        </p>
        <p>
          This project is inspired by the wonderful{' '}
          <Link value="METOO" label="#metoorising" /> project. With most
          visualization features supported by{' '}
          <Link value="REACT_GLOBE_GITHUB" label="react-globe" />, the project
          aims to generalize and simplify building beautiful Google Trends globe
          visualizations.
        </p>
        <p>
          To build your own Google Trends globe visualizations, you can click on
          the <b>Deploy to Netlify</b> button below. You can edit and commit the{' '}
          <Link value="CONFIG" label="config.js" /> file to customize trend
          keywords and various visual settings. For additional information,
          please visit to the <Link value="GITHUB_REPO" label="Github" /> page.
        </p>
        <p>
          <a href="https://app.netlify.com/start/deploy?repository=https://github.com/chrisrzhou/google-globe-trends">
            <img
              src="https://www.netlify.com/img/deploy/button.svg"
              alt="Deploy to Netlify"
            />
          </a>
        </p>
        <Button label="Back" onClick={onHide} />
      </div>
    </Blur>
  );
}

export default About;
