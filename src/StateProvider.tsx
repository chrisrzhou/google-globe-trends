import React, { createContext, useContext, useReducer } from 'react';

// need help typing this
const StateContext = createContext<any>(null);

export default function StateProvider<State, Action>({
  children,
  initialState,
  reducer,
}: {
  children: React.ReactElement[];
  initialState: State;
  reducer: (state: State, action: Action) => State;
}): React.ReactElement {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

// need help typing this
export function useStateValue(): [any, any] {
  return useContext(StateContext);
}
