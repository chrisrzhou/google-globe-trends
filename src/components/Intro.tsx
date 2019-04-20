import React from 'react';

import { useStateValue } from '../state/StateProvider';
import { ActionType } from '../types';
import Blur from './ui/Blur';
import Button from './ui/Button';
import Link from './ui/Link';

function Intro(): React.ReactElement {
  const [{ keyword, start }, dispatch] = useStateValue();
  return (
    <Blur className="intro" config={{ friction: 50 }} shown={!start}>
      <h1>Google Globe Trends</h1>
      <p>
        Visualizing <b>{`"${keyword}"`}</b> Google Trends with{' '}
        <Link value="REACT_GLOBE_GITHUB" label="react-globe" />
      </p>
      <Button
        label="Explore"
        onClick={(): void => dispatch({ type: ActionType.Start })}
      />
    </Blur>
  );
}

export default Intro;
