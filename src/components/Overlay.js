import moment from 'moment';
import React, { useState } from 'react';

import { getTop5Markers } from '../state/selectors';
import { useStateValue } from '../state/StateProvider';
import About from './About';
import Fade from './Fade';
import Link from './Link';

function Overlay() {
  const [state, dispatch] = useStateValue();
  const [showAbout, setShowAbout] = useState(false);
  const { keyword, lastUpdated, start, focusedMarker } = state;
  const top5Markers = getTop5Markers(state);
  return (
    <>
      <About onHide={() => setShowAbout(false)} shown={showAbout} />
      <Fade className="overlay" shown={start && !focusedMarker}>
        <div className="header">
          <div>
            <h2>Google Globe Trends</h2>
            <div className="overlay-subtitle">
              Visualizing <b>{`"${keyword.join(', ')}"`}</b> Google Trends with{' '}
              <Link value="REACT_GLOBE_GITHUB" label="react-globe" />
            </div>
          </div>
          <div>
            <a
              href="#"
              onClick={() => setShowAbout(true)}
              style={{ marginRight: 24 }}>
              About
            </a>
            <Link value="GITHUB_REPO" label="Github" />
          </div>
        </div>
        <div className="content">
          TOP 5 SEARCHING CITIES
          {top5Markers.map((marker) => {
            return (
              <a key={marker.city} href="#">
                <h2
                  onClick={() => dispatch({ type: 'FOCUS', payload: marker })}>
                  {marker.city}
                </h2>
              </a>
            );
          })}
        </div>
        <div className="footer">
          Updated on {moment(lastUpdated).format('MMM D, YYYY')}
        </div>
      </Fade>
    </>
  );
}

export default Overlay;
