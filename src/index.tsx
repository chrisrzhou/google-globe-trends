import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { initialState, reducer } from './state';
import StateProvider from './state/StateProvider';

function Root(): React.ReactElement {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
