import { Marker, State } from '../types';

export function getRandomMarker(state: State): Marker {
  const { focusedMarker, markers } = state;
  const filteredMarkers = markers.filter(
    (marker: Marker): boolean => {
      if (!focusedMarker || focusedMarker.city !== marker.city) {
        return true;
      }
      return false;
    },
  );
  return filteredMarkers[Math.floor(Math.random() * filteredMarkers.length)];
}

export function getTop5Markers(state: State): Marker[] {
  return state.markers
    .concat()
    .sort((a, b): number => b.value - a.value)
    .slice(0, 5);
}
