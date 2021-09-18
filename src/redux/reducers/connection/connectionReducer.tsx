import { IActionConnection, IConnection } from '../../../types';
import { SET_CONNECTION } from './connectionActions';

export const defaultConnectionState: IConnection = {
  url: '',
  isConnected: false,
  isGoToLobby: false,
};

export const connectionReducer = (state = defaultConnectionState, action: IActionConnection): IConnection => {
  switch (action.type) {
    case SET_CONNECTION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
