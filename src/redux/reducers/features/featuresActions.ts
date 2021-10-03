import { IAction, IUser, IFeatures } from '../../../types';

export const SET_FEATURE = 'SET_FEATURE';
export const RESET_VOTING = 'RESET_VOTING';

export const setFeature = (title: keyof IFeatures, value: boolean | IUser): IAction<boolean | IUser> => ({
  type: SET_FEATURE,
  payload: { [title]: value },
});

export const resetVoting = (value = null): IAction<null> => ({
  type: RESET_VOTING,
  payload: { value },
});
