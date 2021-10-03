import { IAction, IPopUp } from '../../../types';
import { SET_OPEN } from './popUpActions';

export const defaultPopUpState: IPopUp = {
  isOpen: false,
};

export const popUpReducer = (state = defaultPopUpState, action: IAction<boolean>): IPopUp => {
  switch (action.type) {
    case SET_OPEN:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
