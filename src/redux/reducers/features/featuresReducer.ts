import { IAction, IUser, IFeatures } from '../../../types';
import { ADD_KICK_MEMBER, ADD_ROOM_MEMBER, RESET_VOTING, SET_VOTE } from './featuresActions';

export const defaultFeaturesState: IFeatures = {
  isVoted: false,
  kickMember: null,
  candidate: null,
};

export const featuresReducer = (state = defaultFeaturesState, action: IAction<IUser>): IFeatures => {
  switch (action.type) {
    case SET_VOTE:
      return { ...state, ...action.payload };
    case ADD_KICK_MEMBER:
      return { ...state, kickMember: { ...action.payload.kickMember } };
    case ADD_ROOM_MEMBER:
      return { ...state, candidate: { ...action.payload.candidate } };
    case RESET_VOTING:
      return { ...state, ...defaultFeaturesState };
    default:
      return state;
  }
};
