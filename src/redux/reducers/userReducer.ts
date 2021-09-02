import { SET_USER } from './../actionsSync/userActions';
import { IUser, GameRole } from './../../types';
import { IAction } from '../../types';

export const defaultUserState: IUser = {
  firstName: '',
  lastName: '',
  jobPostion: '',
  urlToImage: '',
  role: GameRole.player
}

export const userReducer = (state = defaultUserState, action: IAction): IUser => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
