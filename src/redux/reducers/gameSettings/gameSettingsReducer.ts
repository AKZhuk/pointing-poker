import { IAction, IGameSettings } from '../../../types';
import { ADD_CARD, SET_SETTING } from './gameSettingsActions';

export const defaultSettingsState: IGameSettings = {
  ScrumMasterAsPlayer: false,
  changingCardInRoundEnd: false,
  isTimerNeeded: false,
  scoreType: 'story point',
  scoreTypeShort: '',
  timer: '02:00',
  flipCardsWhenAllVoted: false,
  addPlayerWhenGameStarted: false,
  cards: 1,
};

export const gameSettingsReducer = (state = defaultSettingsState, action: IAction<string>): IGameSettings => {
  switch (action.type) {
    case SET_SETTING:
      return { ...state, ...action.payload };
    case ADD_CARD:
      return { ...state, cards: state.cards + 1 };
    default:
      return state;
  }
};
