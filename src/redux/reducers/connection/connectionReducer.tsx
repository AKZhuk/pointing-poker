import { IAction, IConnection } from '../../../types';
import { SET_CONNECTION } from './connectionActions';

export const defaultConnectionState: IConnection = {
  url: '',
};

export const connectionReducer = (state = defaultConnectionState, action: IAction): IConnection => {
  switch (action.type) {
    case SET_CONNECTION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
