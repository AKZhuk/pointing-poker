import { GameRole, IRoom, IRoomAction, Routes, IAction } from '../../../types';
import { ADD_CARD, ADD_ROOM, SET_ROOM, SET_SETTING } from './roomActions';

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
    cards: 4,
  },
  route: Routes.firstPage,
  game: {
    activeIssueId: '',
    vote: {},
    remainingRoundTime: '',
    cardsIsFlipped: false,
  },
  chatMessages: [],
};

export const roomReducer = (state: IRoom = defaultRoomState, action: IRoomAction | IAction<string | boolean | null>): IRoom => {
  switch (action.type) {
    case ADD_ROOM:
      return { ...state, ...action.payload };
    case SET_ROOM:
      return { ...state, ...action.payload };
    case SET_SETTING:
      return { ...state, gameSettings: { ...state.gameSettings, ...action.payload } };
    case ADD_CARD:
      return { ...state, gameSettings: { ...state.gameSettings, cards: state.gameSettings.cards + 1 } };
    default:
      return state;
  }
};
