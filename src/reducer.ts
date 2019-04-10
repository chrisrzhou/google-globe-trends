export interface State {
  start: boolean;
}

export enum ActionType {
  Start = 'START',
}

export interface Action {
  type: ActionType;
  payload?: any;
}

export const initialState: State = {
  start: false,
};

export default function reducer(state: State, action: Action): State {
  const { payload, type } = action;
  switch (type) {
    case ActionType.Start:
      return {
        ...state,
        start: true,
      };
    default:
      return state;
  }
}
