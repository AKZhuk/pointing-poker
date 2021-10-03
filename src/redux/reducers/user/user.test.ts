import { defaultUserState, userReducer } from './userReducer';
import { IUser, GameRole } from '../../../types';
import { SET_USER, setUser, setDefaultUser, RESET_USER_DATA } from './userActions';

describe('Test for user actions', () => {
  it('Action "setUser" should working correctly', () => {
    const result = { type: SET_USER, payload: { firstName: 'testName' } };
    expect(setUser('firstName', 'testName')).toStrictEqual(result);
  });
  it('Action "setDefaultUser" should working correctly', () => {
    const result = { type: RESET_USER_DATA, payload: { id: '213213' } };
    expect(setDefaultUser('id', '213213')).toStrictEqual(result);
  });
});

describe('Tests for "userReducer"', () => {
  it('"userReducer" should work correctly with "setFeatures" action', () => {
    const action = setUser('firstName', 'testName');
    const result: IUser = {
      firstName: 'testName',
      lastName: '',
      id: '',
      urlToImage: '',
      jobPostion: '',
      role: GameRole.scrumMaster,
    };
    expect(userReducer(defaultUserState, action)).toStrictEqual(result);
  });
  it('"userReducer" should work correctly with "setDefaultUser" action', () => {
    const action = setDefaultUser('id', '21123');
    expect(userReducer(defaultUserState, action)).toStrictEqual(defaultUserState);
  });
});
