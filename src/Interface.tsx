import React, { useState } from 'react';

import About from './About';
import Link from './Link';

function Interface(): React.ReactElement {
  const [showAbout, setShowAbout] = useState(false);
  return (
    <div className="interface">
      <About onHide={(): void => setShowAbout(false)} shown={showAbout} />
      <div className="interface-header">
        <div />
        <div>
          <a
            href="#"
            onClick={(): void => setShowAbout(true)}
            style={{ marginRight: 24 }}>
            About
          </a>
          <Link value="GITHUB_REPO" label="Github" />
        </div>
      </div>
    </div>
  );
}

export default Interface;
