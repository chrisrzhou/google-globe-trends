import React from 'react';

import Detail from './Detail';
import Globe from './Globe';
import Intro from './Intro';
import Overlay from './Overlay';

function App(): React.ReactElement {
  return (
    <>
      <Globe />
      <Intro />
      <Overlay />
      <Detail />
    </>
  );
}

export default App;
