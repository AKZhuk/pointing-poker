export interface IAction {
  type: string;
  payload?: null | string;
}

export interface IState {
  isLoad: boolean;
  error: string;
}
