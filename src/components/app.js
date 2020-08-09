import React from 'react';

import Details from './details';
import Globe from './globe';
import Intro from './intro';
import Overlay from './overlay';

export default function App() {
  return (
    <>
      <Globe />
      <Intro />
      <Overlay />
      <Details />
    </>
  );
}
