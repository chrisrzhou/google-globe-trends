export interface Marker {
  city: string;
  coordinates: number[];
  countryCode: string;
  countryName: string;
  value: number;
}

export interface State {
  focusedMarker?: Marker;
  keyword: string;
  lastUpdated: number;
  markers: Marker[];
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
