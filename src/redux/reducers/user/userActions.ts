import { IUser, IAction } from '../../../types';

export const SET_USER = 'SET_USER';

export const setUser = (title: keyof IUser, value: string): IAction => ({
  type: SET_USER,
  payload: { [title]: value },
});
