import { GameRole, GameStatus, IRoom, IRoomAction } from '../../../types';
import { ADD_ROOM, SET_ROOM } from './roomActions';

export const defaultRoomState: IRoom = {
  roomKey: '',
  scrumMaster: {
    id: '',
    firstName: '',
    lastName: '',
    jobPostion: '',
    urlToImage: '',
    role: GameRole.scrumMaster,
  },
  members: [],
  issues: [],
  gameSettings: {
    ScrumMasterAsPlayer: false,
    changingCardInRoundEnd: false,
    isTimerNeeded: false,
    scoreType: 'story point',
    scoreTypeShort: '',
    timer: '02:00',
    flipCardsWhenAllVoted: false,
    addPlayerWhenGameStarted: false,
    cards: 1,
  },
  gameStatus: GameStatus.pending,
};

export const roomReducer = (state: IRoom = defaultRoomState, action: IRoomAction): IRoom => {
  switch (action.type) {
    case ADD_ROOM:
      return { ...state, ...action.payload };
    case SET_ROOM:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
