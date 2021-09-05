import { IActionPopUp, PopUpNames } from '../../../types';

export const SET_OPEN = 'SET_OPEN';

export const setOpen = (title: keyof typeof PopUpNames, value: boolean): IActionPopUp => ({
  type: SET_OPEN,
  payload: { [title]: value },
});
