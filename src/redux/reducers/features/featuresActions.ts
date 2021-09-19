import { IAction, IUser, IFeatures } from '../../../types';

export const SET_VOTE = 'SET_VOTE';
export const ADD_KICK_MEMBER = 'ADD_KICK_MEMBER';
export const ADD_ROOM_MEMBER = 'ADD_ROOM_MEMBER';
export const RESET_VOTING = 'RESET_VOTING';

export const setVote = (title: keyof IFeatures, value: boolean): IAction<boolean> => ({
  type: SET_VOTE,
  payload: { [title]: value },
});

export const addKickMember = (title: keyof IFeatures, value: IUser | null): IAction<IUser | null> => ({
  type: ADD_KICK_MEMBER,
  payload: { [title]: value },
});

export const resetVoting = (value: null): IAction<IUser | null> => ({
  type: RESET_VOTING,
  payload: { value },
});

export const addMemberToRoom = (title: keyof IFeatures, value: IUser | null): IAction<IUser | null> => ({
  type: ADD_ROOM_MEMBER,
  payload: { [title]: value },
});
