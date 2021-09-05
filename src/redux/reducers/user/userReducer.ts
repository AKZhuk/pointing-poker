import { REMOVE_MEMBER, SET_USER } from './userActions';
import { GameRole, IAction, IUserState } from '../../../types';

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
    {
      firstName: 'Aliaksei',
      lastName: 'Zayakin',
      jobPostion: 'developer',
      urlToImage: '',
      role: GameRole.player,
    },
    {
      firstName: 'Aliaksei',
      lastName: 'Zhukov',
      jobPostion: 'developer',
      urlToImage: '',
      role: GameRole.player,
    },
    {
      firstName: 'Ivan',
      lastName: 'Ivanov',
      jobPostion: 'project manager',
      urlToImage: '',
      role: GameRole.scrumMaster,
    },
    {
      firstName: 'Aliaksei',
      lastName: 'Petrov',
      jobPostion: 'developer',
      urlToImage: '',
      role: GameRole.player,
    },
  ],
};

export const userReducer = (state = defaultUserState, action: IAction): IUserState => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: { ...state.user, ...action.payload } };

    case REMOVE_MEMBER:
      return { ...state, members: state.members.filter(member => member.lastName !== action.payload.lastName) };

    default:
      return state;
  }
};
