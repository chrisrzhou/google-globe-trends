import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { initialState, reducer } from './state';
import StateProvider from './state/StateProvider';

import './index.scss';

function Root() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
