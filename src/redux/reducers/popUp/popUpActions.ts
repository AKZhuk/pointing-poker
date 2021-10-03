import { IAction } from './../../../types';
import { PopUpNames } from '../../../types';

export const SET_OPEN = 'SET_OPEN';

export const setOpen = (title: keyof typeof PopUpNames, value: boolean): IAction<boolean> => ({
  type: SET_OPEN,
  payload: { [title]: value },
});
