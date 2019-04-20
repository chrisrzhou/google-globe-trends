import { Marker, State } from '../types';

export function getMarkers(state: State): Marker[] {
  return state.markers;
}

export function getRandomMarker(state: State): Marker {
  const { focusedMarker } = state;
  const markers = getMarkers(state).filter(
    (marker: Marker): boolean => {
      if (!focusedMarker || focusedMarker.city !== marker.city) {
        return true;
      }
      return false;
    },
  );
  return markers[Math.floor(Math.random() * markers.length)];
}

export function getTop5Markers(state: State): Marker[] {
  return getMarkers(state)
    .concat()
    .sort((a, b): number => b.value - a.value)
    .slice(0, 5);
}
