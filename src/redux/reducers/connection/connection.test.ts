import { connectionReducer, defaultConnectionState } from './connectionReducer';
import { SET_CONNECTION, setConnection } from './connectionActions';

describe('Test for connection actions', () => {
  it('Action "setConnection" should working correctly', () => {
    const result = { type: SET_CONNECTION, payload: { url: 'test' } };
    expect(setConnection('url', 'test')).toStrictEqual(result);
  });
});

describe('Tests for "connectionReducer"', () => {
  it('"connectionReducer" should work correctly with "setConnection" action', () => {
    const action = setConnection('url', 'test');
    const result = { url: 'test', isConnected: false, isGoToLobby: false };
    expect(connectionReducer(defaultConnectionState, action)).toStrictEqual(result);
  });
});
