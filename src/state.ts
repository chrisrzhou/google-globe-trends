import data from './_data/trends.json';
import config from './config';
import { Action, ActionType, Marker, State } from './types';

export const initialState: State = {
  activeTime: data.interestOverTime[data.interestOverTime.length - 1].time,
  keyword: config.data.keyword,
  data,
  start: false,
};

export function reducer(state: State, action: Action): State {
  const { type } = action;
  switch (type) {
    case ActionType.Start:
      return {
        ...state,
        start: true,
      };
    case ActionType.Focus:
      return {
        ...state,
        focusedMarker: action.payload,
      };
    default:
      return state;
  }
}

export function getMarkers(state: State): Marker[] {
  const { activeTime, data } = state;
  return data.trends[activeTime];
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
