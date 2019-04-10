import './App.scss';

import React from 'react';

import Globe from './Globe';
import Interface from './Interface';
import Intro from './Intro';
import reducer, { initialState } from './reducer';

const { useReducer } = React;

function App(): React.ReactElement {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { start } = state;
  return (
    <>
      <Globe ready={start} />
      <Intro dispatch={dispatch} shown={!start} />
      <Interface />
    </>
  );
}

export default App;
