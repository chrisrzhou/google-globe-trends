import data from '../_data.json';
import config from '../config';
import { Action, ActionType, State } from '../types';

export const initialState: State = {
  keyword: config.data.keyword,
  lastUpdated: data.lastUpdated,
  markers: data.trends,
  relatedTopics: data.relatedTopics,
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
