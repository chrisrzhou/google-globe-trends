import data from '../data/data.json';
import config from '../config';

export const initialState = {
  keyword: config.data.keyword,
  lastUpdated: data.lastUpdated,
  markers: data.trends,
  relatedTopics: data.relatedTopics,
  start: false,
};

export function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case 'START':
      return {
        ...state,
        start: true,
      };
    case 'FOCUS':
      return {
        ...state,
        focusedMarker: action.payload,
      };
    default:
      return state;
  }
}
