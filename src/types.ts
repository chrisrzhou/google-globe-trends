export interface Data {
  lastUpdated: number;
  interestOverTime: {
    time: number;
    value: number;
  }[];
  trends: {
    [key: number]: Marker[];
  };
}

export interface Marker {
  city: string;
  coordinates: number[];
  countryCode: string;
  countryName: string;
  value: number;
}

export interface State {
  activeTime: number;
  keyword: string;
  data: Data;
  focusedMarker?: Marker;
  start: boolean;
}

export enum ActionType {
  Focus = 'FOCUS',
  Start = 'START',
}

export interface Action {
  type: ActionType;
  payload?: any;
}
