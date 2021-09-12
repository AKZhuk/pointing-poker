import { IAction, IRoom, IRoomAction } from '../../../types';

export const ADD_ROOM = 'ADD_ROOM';
export const SET_ROOM = 'SET_ROOM';

export const addRoom = (value: IRoom): IRoomAction => ({
  type: ADD_ROOM,
  payload: value,
});

export const setRoom = <T>(title: keyof IRoom, value: T): IAction<T> => ({
  type: SET_ROOM,
  payload: { [title]: value },
});
