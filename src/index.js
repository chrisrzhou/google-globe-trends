import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import { StateProvider, initialState, reducer } from './state';

import './index.scss';

function Root() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
