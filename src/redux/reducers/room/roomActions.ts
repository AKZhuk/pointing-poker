import { IGameSettings, IAction, IRoom, IRoomAction } from '../../../types';

export const ADD_ROOM = 'ADD_ROOM';
export const SET_ROOM = 'SET_ROOM';
export const SET_SETTING = 'SET_SETTING';
export const ADD_CARD = 'ADD_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';

export const addRoom = (value: IRoom): IRoomAction => ({
  type: ADD_ROOM,
  payload: value,
});

export const setRoom = <T>(title: keyof IRoom, value: T): IAction<T> => ({
  type: SET_ROOM,
  payload: { [title]: value },
});

export const setSetting = <T>(name: keyof IGameSettings, value: T): IAction<T> => ({
  type: SET_SETTING,
  payload: { [name]: value },
});

export const addCard = (value = null):  IAction<null> => ({
  type: ADD_CARD,
  payload: { card: value},
});

export const removeCard = (): { type: string } => ({
  type: REMOVE_CARD,
});
