import { IUser, IAction } from '../../../types';

export const SET_USER = 'SET_USER';
export const RESET_USER_DATA = 'RESET_USER_DATA';
export const SET_MEMBER = 'SET_MEMBER';
export const REMOVE_MEMBER = 'REMOVE_MEMBER';


export const setUser = (title: keyof IUser, value: string): IAction => ({
  type: SET_USER,
  payload: { [title]: value },
});


export const removeMember = (lastName: string): IAction => ({ type: REMOVE_MEMBER, payload: { lastName } });

export const setDefaultUser = (title: keyof IUser, value: string): IAction => ({
  type: RESET_USER_DATA,
  payload: { [title]: value },
});
