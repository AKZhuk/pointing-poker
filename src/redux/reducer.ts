import { IAction, IState } from '../types';
import { SWITCH_IS_LOAD } from './actions';

const defaultState: IState = {
  isLoad: false,
  error: '',
};

export const reducer = (state = defaultState, action: IAction): IState => {
  switch (action.type) {
    case SWITCH_IS_LOAD:
      return { ...state, isLoad: !state.isLoad };

    default:
      return state;
  }
};
