import { IAction, IGameSettings } from '../../../types';

export const SET_SETTING = 'SET_SETTINGs';

export const setSetting = <T>(name: keyof IGameSettings, value: T): IAction<T> => ({
  type: SET_SETTING,
  payload: { [name]: value },
});
