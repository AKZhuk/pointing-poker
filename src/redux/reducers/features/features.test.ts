import { defaultFeaturesState, featuresReducer } from './featuresReducer';
import { IUser, GameRole } from '../../../types';
import { SET_FEATURE, setFeature, RESET_VOTING, resetVoting } from './featuresActions';

const testUser: IUser = {
  id: '1111',
  firstName: 'TestName',
  lastName: 'TestLastName',
  urlToImage: 'test/test',
  role: GameRole.player,
};
describe('Test for features actions', () => {
  it('Action "setFeature" should working correctly', () => {
    const result = { type: SET_FEATURE, payload: { isVoted: true } };
    expect(setFeature('isVoted', true)).toStrictEqual(result);
  });
  it('Action "resetVoting" should working correctly', () => {
    const result = { type: RESET_VOTING, payload: { value: null } };
    expect(resetVoting()).toStrictEqual(result);
  });
});

describe('Tests for "featuresReducer"', () => {
  it('"featuresReducer" should work correctly with "setFeatures" action', () => {
    const action = setFeature('kickMember', testUser);
    const result = { isVoted: false, kickMember: testUser, candidate: null };
    expect(featuresReducer(defaultFeaturesState, action)).toStrictEqual(result);
  });
  it('"featuresReducer" should work correctly with "resetVoting" action', () => {
    const action = resetVoting();
    expect(featuresReducer(defaultFeaturesState, action)).toStrictEqual(defaultFeaturesState);
  });
});
