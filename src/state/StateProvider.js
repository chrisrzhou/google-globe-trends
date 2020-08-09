import React, { createContext, useContext, useReducer } from 'react';

const StateContext = createContext(null);

export default function StateProvider({ children, initialState, reducer }) {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

export function useStateValue() {
  return useContext(StateContext);
}
