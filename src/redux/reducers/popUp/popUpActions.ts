import { IActionPopUp } from '../../../types';

export const SET_OPEN = 'SET_OPEN';

export const setOpen = (title: string, value: boolean): IActionPopUp => ({
  type: SET_OPEN,
  payload: { [title]: value },
});
