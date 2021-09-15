import { IAction, IUser, IVoting } from '../../../types';
import { ADD_MEMBER, RESET_VOTING, SET_VOTE } from './votingActions';

export const defaultVotingState: IVoting = {
  isVoted: false,
  kickMember: null,
};

export const votingReducer = (state = defaultVotingState, action: IAction<IUser>): IVoting => {
  switch (action.type) {
    case SET_VOTE:
      return { ...state, ...action.payload };
    case ADD_MEMBER:
      return { ...state, kickMember: { ...action.payload.kickMember } };
    case RESET_VOTING:
      return { ...state, ...defaultVotingState };
    default:
      return state;
  }
};
