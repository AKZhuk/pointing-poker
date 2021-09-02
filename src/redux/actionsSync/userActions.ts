import { defaultUserState } from './../reducers/userReducer';
import { IUser } from './../../types';

import { IAction } from '../../types';

export const SET_USER = 'SET_USER';

export const setUser = (name: keyof typeof defaultUserState, value: string): IAction => ({
  type: SET_USER,
  payload: {[name]: value},
});
