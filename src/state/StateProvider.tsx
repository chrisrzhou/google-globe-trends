import React, { createContext, useContext, useReducer } from 'react';

import { Action, State } from '../types';

const StateContext = createContext<any>(null);

export default function StateProvider<State, Action>({
  children,
  initialState,
  reducer,
}: {
  children: React.ReactElement;
  initialState: State;
  reducer: (state: State, action: Action) => State;
}): React.ReactElement {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

export function useStateValue(): [State, React.Dispatch<Action>] {
  return useContext(StateContext);
}
