import { RESET_USER_DATA, SET_USER } from './userActions';
import { GameRole, IAction, IUser } from '../../../types';

export const defaultUserState: IUser = {
  id: '',
  firstName: '',
  lastName: '',
  jobPostion: '',
  urlToImage: '',
  role: GameRole.scrumMaster,
};

export const userReducer = (state = defaultUserState, action: IAction<string>): IUser => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };

    case RESET_USER_DATA:
      return { ...defaultUserState };

    default:
      return state;
  }
};
