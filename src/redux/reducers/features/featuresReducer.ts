import { IAction, IUser, IFeatures } from '../../../types';
import { SET_FEATURE, RESET_VOTING } from './featuresActions';

export const defaultFeaturesState: IFeatures = {
  isVoted: false,
  kickMember: null,
  candidate: null,
};

export const featuresReducer = (state = defaultFeaturesState, action: IAction<IUser | boolean | null>): IFeatures => {
  switch (action.type) {
    case SET_FEATURE:
      return { ...state, ...action.payload };
    case RESET_VOTING:
      return { ...state, ...defaultFeaturesState };
    default:
      return state;
  }
};
