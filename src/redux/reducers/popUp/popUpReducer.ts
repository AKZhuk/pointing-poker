import { IAction, IPopUp } from '../../../types';
import { SET_OPEN } from './popUpActions';

export const defaultUserState: IPopUp = {
  isOpen: false,
};

export const popUpReducer = (state = defaultUserState, action: IAction<IPopUp>): IPopUp => {
  switch (action.type) {
    case SET_OPEN:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
