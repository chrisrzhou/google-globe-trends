import React from 'react';

import Blur from './Blur';
import Button from './Button';
import config from './config';
import Link from './Link';
import { Action, ActionType } from './reducer';

const { keyword } = config.data;

interface Props {
  shown: boolean;
  dispatch: (action: Action) => void;
}

function Intro({ dispatch, shown }: Props): any {
  return (
    <Blur className="intro" shown={shown}>
      <h1>Google Globe Trends</h1>
      <p>
        Visualize <b>{`"${keyword}"`}</b> Google Trends with{' '}
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
