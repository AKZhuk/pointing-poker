import { defaultUserState } from './userReducer';

import { IAction } from '../../../types';

export const SET_USER = 'SET_USER';

export const setUser = (title: keyof typeof defaultUserState, value: string): IAction => ({
  type: SET_USER,
  payload: { [title]: value },
});
