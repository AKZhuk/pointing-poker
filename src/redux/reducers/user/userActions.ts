import { IUser, IAction } from '../../../types';

export const SET_USER = 'SET_USER';
export const SET_DEFAULT = 'SET_DEFAULT';

export const setUser = (title: keyof IUser, value: string): IAction => ({
  type: SET_USER,
  payload: { [title]: value },
});

export const setDefaultUser = (title: keyof IUser, value: string): IAction => ({
  type: SET_DEFAULT,
  payload: { [title]: value },
});
