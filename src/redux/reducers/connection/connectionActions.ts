import { IAction, IConnection } from '../../../types';

export const SET_CONNECTION = 'SET_CONNECTION';

export const setConnection = (title: keyof IConnection, value: string): IAction => ({
  type: SET_CONNECTION,
  payload: { [title]: value },
});
