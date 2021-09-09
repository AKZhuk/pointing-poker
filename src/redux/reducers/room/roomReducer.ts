import { ADD_ROOM, SET_ROOM } from './roomActions';
import { IRoom, IRoomAction } from '../../../types';

export const roomReducer = (state: IRoom | null = null, action: IRoomAction): IRoom | null => {
  switch (action.type) {
    case ADD_ROOM:
      return { ...state, ...action.payload };
    case SET_ROOM:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
