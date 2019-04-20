import React from 'react';

import Details from './Details';
import Globe from './Globe';
import Intro from './Intro';
import Overlay from './Overlay';

function App(): React.ReactElement {
  return (
    <>
      <Globe />
      <Intro />
      <Overlay />
      <Details />
    </>
  );
}

export default App;
