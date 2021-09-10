import { IAction, IGameSettings } from '../../../types';

export const SET_SETTING = 'SET_SETTINGs';
export const ADD_CARD = 'ADD_CARD';

export const setSetting = <T>(name: keyof IGameSettings, value: T): IAction<T> => ({
  type: SET_SETTING,
  payload: { [name]: value },
});

export const addCard = (): { type: string } => ({
  type: ADD_CARD,
});
