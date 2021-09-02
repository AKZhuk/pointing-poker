import { IAction, IState1 } from '../types';
import { SWITCH_IS_LOAD } from './actions';

const defaultState: IState1 = {
  isLoad: false,
  error: '',
};

export const reducer = (state = defaultState, action: IAction): IState1 => {
  switch (action.type) {
    case SWITCH_IS_LOAD:
      return { ...state, isLoad: !state.isLoad };

    default:
      return state;
  }
};
