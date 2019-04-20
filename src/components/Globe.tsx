import React from 'react';
import ReactGlobe from 'react-globe';

import config from '../config';
import markerRenderer from '../markerRenderer';
import { useStateValue } from '../state/StateProvider';
import { ActionType, Marker } from '../types';
import Blur from './ui/Blur';

const { cameraOptions, focusOptions, globeOptions, lightOptions } = config;

const markerOptions = {
  enableTooltip: true,
  getTooltipContent: (marker: Marker): string =>
    `${marker.city} (${marker.value})`,
  renderer: markerRenderer,
};

function Globe(): React.ReactElement {
  const [state, dispatch] = useStateValue();
  const { focusedMarker, start } = state;
  const markers = start ? state.markers : [];
  const focus =
    focusedMarker !== undefined ? focusedMarker.coordinates : undefined;
  return (
    <Blur className="globe" config={{ friction: 150 }} shown={true}>
      <ReactGlobe
        cameraOptions={cameraOptions}
        focus={focus}
        focusOptions={focusOptions}
        globeOptions={globeOptions}
        lightOptions={lightOptions}
        markers={markers}
        markerOptions={markerOptions}
        onClickMarker={(marker: Marker): void =>
          dispatch({ type: ActionType.Focus, payload: marker })
        }
      />
    </Blur>
  );
}

export default Globe;
