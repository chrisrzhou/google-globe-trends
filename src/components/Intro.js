import React from 'react';

import { useStateValue } from '../state/StateProvider';
import Fade from './Fade';
import Button from './Button';
import Link from './Link';

function Intro() {
  const [{ keyword, start }, dispatch] = useStateValue();
  return (
    <Fade className="intro" shown={!start}>
      <h1>Google Globe Trends</h1>
      <p>
        Visualizing <b>{`"${keyword}"`}</b> Google Trends with{' '}
        <Link value="REACT_GLOBE_GITHUB" label="react-globe" />
      </p>
      <Button label="Explore" onClick={() => dispatch({ type: 'START' })} />
    </Fade>
  );
}

export default Intro;
