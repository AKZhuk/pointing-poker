import { IAction, IUser, IVoting } from '../../../types';

export const SET_VOTE = 'SET_VOTE';
export const ADD_MEMBER = 'ADD_MEMBER';
export const RESET_VOTING = 'RESET_VOTING';

export const setVote = (title: keyof IVoting, value: boolean): IAction<boolean> => ({
  type: SET_VOTE,
  payload: { [title]: value },
});

export const addKickMember = (title: keyof IVoting, value: IUser | null): IAction<IUser | null> => ({
  type: ADD_MEMBER,
  payload: { [title]: value },
});

export const resetVoting = (value: null): IAction<IUser | null> => ({
  type: RESET_VOTING,
  payload: { value },
});
