import React from 'react';
import ReactGlobe from 'react-globe';

import Blur from './Blur';
import config from './config';
import markerRenderer from './markerRenderer';
import { getMarkers } from './state';
import { useStateValue } from './StateProvider';
import { ActionType } from './types';

const { cameraOptions, focusOptions, globeOptions, lightOptions } = config;

function Globe(): React.ReactElement {
  const [state, dispatch] = useStateValue();
  const { focusedMarker, start } = state;
  const markers = start ? getMarkers(state) : [];
  return (
    <Blur className="globe" config={{ friction: 150 }} shown={true}>
      <ReactGlobe
        cameraOptions={cameraOptions}
        focus={
          focusedMarker !== undefined ? focusedMarker.coordinates : undefined
        }
        focusOptions={focusOptions}
        globeOptions={globeOptions}
        lightOptions={lightOptions}
        markers={markers}
        markerOptions={{
          enableTooltip: start,
          getTooltipContent: (marker: any): string =>
            `${marker.city} (${marker.value})`,
          renderer: markerRenderer,
        }}
        onClickMarker={(marker: any): void =>
          dispatch({ type: ActionType.Focus, payload: marker })
        }
      />
    </Blur>
  );
}

export default Globe;
