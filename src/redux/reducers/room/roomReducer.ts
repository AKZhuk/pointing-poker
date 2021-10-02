import { GameRole, IRoom, IRoomAction, Routes } from '../../../types';
import { ADD_CARD, ADD_ROOM, REMOVE_CARD, SET_ROOM, SET_SETTING } from './roomActions';

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
    scoreType: 'storyPoint',
    timer: '01:00',
    flipCardsWhenAllVoted: false,
    addPlayerWhenGameStarted: false,
    cards: 3,
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

export const roomReducer = (state: IRoom = defaultRoomState, action: IRoomAction): IRoom => {
  switch (action.type) {
    case ADD_ROOM:
      return { ...state, ...action.payload };
    case SET_ROOM:
      return { ...state, ...action.payload };
    case SET_SETTING:
      return { ...state, gameSettings: { ...state.gameSettings, ...action.payload } };
    case ADD_CARD:
      return { ...state, gameSettings: { ...state.gameSettings, cards: state.gameSettings.cards + 1 } };
    case REMOVE_CARD:
      return { ...state, gameSettings: { ...state.gameSettings, cards: state.gameSettings.cards - 1 } };
    default:
      return state;
  }
};
