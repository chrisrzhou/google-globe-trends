import moment from 'moment';
import React, { useState } from 'react';

import { getTop5Markers } from '../state/selectors';
import { useStateValue } from '../state/StateProvider';
import { ActionType } from '../types';
import About from './About';
import Blur from './ui/Blur';
import Link from './ui/Link';

function Overlay(): React.ReactElement {
  const [state, dispatch] = useStateValue();
  const [showAbout, setShowAbout] = useState(false);
  const { keyword, lastUpdated, start, focusedMarker } = state;
  const top5Markers = getTop5Markers(state);
  return showAbout ? (
    <About onHide={(): void => setShowAbout(false)} shown={showAbout} />
  ) : (
    <Blur
      className="overlay"
      config={{ friction: 50 }}
      shown={start && !focusedMarker}>
      <div className="header">
        <div>
          <h2>Google Globe Trends</h2>
          <div className="overlay-subtitle">
            Visualizing <b>{`"${keyword}"`}</b> Google Trends with{' '}
            <Link value="REACT_GLOBE_GITHUB" label="react-globe" />
          </div>
        </div>
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
      <div className="content">
        TOP 5 SEARCHING CITIES
        {top5Markers.map(
          (marker): React.ReactNode => {
            return (
              <a key={marker.city} href="#">
                <h2
                  onClick={(): void =>
                    dispatch({ type: ActionType.Focus, payload: marker })
                  }>
                  {marker.city}
                </h2>
              </a>
            );
          },
        )}
      </div>
      <div className="footer">
        Updated on {moment(lastUpdated).format('MMM D, YYYY')}
      </div>
    </Blur>
  );
}

export default Overlay;
