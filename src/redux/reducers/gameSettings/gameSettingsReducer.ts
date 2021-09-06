import { IAction, IGameSettings } from '../../../types';
import { SET_SETTING } from './gameSettingsActions';

export const defaultSettingsState: IGameSettings = {
  ScrumMasterAsPlayer: false,
  changingCardInRoundEnd: false,
  isTimerNeeded: false,
  scoreType: '',
  scoreTypeShort: '',
  timer: '02:00',
  cards: [],
};

export const gameSettingsReducer = (state = defaultSettingsState, action: IAction<string>): IGameSettings => {
  switch (action.type) {
    case SET_SETTING:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
