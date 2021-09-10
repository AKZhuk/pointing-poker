import { REMOVE_MEMBER, RESET_USER_DATA, SET_MEMBER, SET_USER } from './userActions';
import { IUserState, GameRole, IAction, IUser } from '../../../types';

export const defaultUserState: IUserState = {
  user: {
    firstName: '',
    lastName: '',
    jobPostion: '',
    urlToImage: '',
    role: GameRole.player,
  },
  members: [
    {
      firstName: 'Aliaksei',
      lastName: 'Vasin',
      jobPostion: 'developer',
      urlToImage: '',
      role: GameRole.player,
    },
    {
      firstName: 'Ivan',
      lastName: 'Safonov',
      jobPostion: 'project manager',
      urlToImage: '',
      role: GameRole.player,
    },
    {
      firstName: 'Aliaksei',
      lastName: 'Shut',
      jobPostion: 'developer',
      urlToImage: '',
      role: GameRole.player,
    },
    {
      firstName: 'Aliaksei',
      lastName: 'Kamozin',
      jobPostion: 'developer',
      urlToImage: '',
      role: GameRole.player,
    },
    {
      firstName: 'Ivan',
      lastName: 'Sidorov',
      jobPostion: 'project manager',
      urlToImage: '',
      role: GameRole.player,
    },
  ],
};

export const userReducer = (state = defaultUserState, action: IAction<IUser>): IUserState => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: { ...state.user, ...action.payload } };

    case RESET_USER_DATA:
      return { ...state, user: defaultUserState.user };

    case SET_MEMBER:
      return { ...state, members: [...state.members, action.payload.user] };

    case REMOVE_MEMBER:
      return { ...state, members: state.members.filter(member => member.lastName !== action.payload.user.lastName) };

    default:
      return state;
  }
};
