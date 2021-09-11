import { IUser, IAction } from '../../../types';

export const SET_USER = 'SET_USER';
export const RESET_USER_DATA = 'RESET_USER_DATA';
export const SET_MEMBER = 'SET_MEMBER';
export const REMOVE_MEMBER = 'REMOVE_MEMBER';

export const setUser = (title: keyof IUser, value: string): IAction<string> => ({
  type: SET_USER,
  payload: { [title]: value },
});
/*
Надо удалить

export const setMember = (user: IUser): IAction<IUser> => ({
  type: SET_MEMBER,
  payload: { user },
});

export const removeMember = (user: IUser): IAction<IUser> => ({ type: REMOVE_MEMBER, payload: { user } });
*/
export const setDefaultUser = (title: keyof IUser, value: string): IAction<string> => ({
  type: RESET_USER_DATA,
  payload: { [title]: value },
});
