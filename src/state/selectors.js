export function getRandomMarker(state) {
  const { focusedMarker, markers } = state;
  const filteredMarkers = markers.filter((marker) => {
    if (!focusedMarker || focusedMarker.city !== marker.city) {
      return true;
    }
    return false;
  });
  return filteredMarkers[Math.floor(Math.random() * filteredMarkers.length)];
}

export function getTop5Markers(state) {
  return state.markers
    .concat()
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
}
