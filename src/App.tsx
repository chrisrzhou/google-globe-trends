import './App.scss';

import React from 'react';

import Detail from './Detail';
import Globe from './Globe';
import Intro from './Intro';
import Overlay from './Overlay';
import { initialState, reducer } from './state';
import StateProvider from './StateProvider';

function App(): React.ReactElement {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Globe />
      <Intro />
      <Overlay />
      <Detail />
    </StateProvider>
  );
}

export default App;
