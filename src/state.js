import React, { createContext, useContext, useReducer } from 'react';

import config from './config';
import data from './data/data.json';

const { lastUpdated, relatedTopics, trends } = data;

export const initialState = {
  config,
  focusedMarker: null,
  hasLoaded: false,
  lastUpdated,
  markers: trends,
  relatedTopics,
  start: false,
};

export function reducer(state, action) {
  const { payload, type } = action;
  switch (type) {
    case 'LOADED':
      return {
        ...state,
        hasLoaded: true,
      };
    case 'START':
      return {
        ...state,
        start: true,
      };
    case 'FOCUS':
      return {
        ...state,
        focusedMarker: payload,
      };
    default:
      return state;
  }
}

const StateContext = createContext(null);

export function StateProvider({ children, initialState, reducer }) {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

export function useStateValue() {
  return useContext(StateContext);
}
