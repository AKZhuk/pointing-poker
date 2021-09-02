import { SET_USER } from './userActions';
import { IUser, GameRole, IAction } from '../../../types';

export const defaultUserState: IUser = {
  firstName: '',
  lastName: '',
  jobPostion: '',
  urlToImage: '',
  role: GameRole.player,
};

export const userReducer = (state = defaultUserState, action: IAction): IUser => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
