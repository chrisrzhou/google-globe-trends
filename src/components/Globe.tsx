import React from 'react';
import ReactGlobe, { Coordinates, Marker, Options } from 'react-globe';

import config from '../config';
import markerRenderer from '../markerRenderer';
import { useStateValue } from '../state/StateProvider';
import Blur from './ui/Blur';
import { ActionType } from '../types';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const markerOptions = {
  markerTooltipRenderer: (marker: Marker): string =>
    `${marker.city} (${marker.value})`,
  markerRenderer,
};

const options = {
  ...config.options,
  ...markerOptions,
} as Options;

function Globe(): React.ReactElement {
  const [state, dispatch] = useStateValue();
  const { focusedMarker, start } = state;
  // @ts-ignore
  const markers = start ? state.markers : [];
  const focus =
    focusedMarker !== undefined ? focusedMarker.coordinates : undefined;
  return (
    <Blur className="globe" config={{ friction: 150 }} shown={true}>
      <ReactGlobe
        globeBackgroundTexture={config.globeBackgroundTexture}
        globeCloudsTexture={config.globeCloudsTexture}
        globeTexture={config.globeTexture}
        height="100vh"
        initialCameraDistanceRadiusScale={3.5}
        focus={focus as Coordinates}
        // @ts-ignore
        markers={markers}
        width="100vw"
        options={options}
        onClickMarker={(marker: Marker): void =>
          dispatch({ type: ActionType.Focus, payload: marker })
        }
      />
    </Blur>
  );
}

export default Globe;
