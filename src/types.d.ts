declare module 'react-globe';

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
