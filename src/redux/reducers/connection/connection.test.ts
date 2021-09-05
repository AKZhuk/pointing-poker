import { connectionReducer } from './connectionReducer';
import { SET_CONNECTION, setConnection } from './connectionActions';

describe('Test for connection actions', () => {
  it('Action "setConnection" should working correctly', () => {
    const result = { type: SET_CONNECTION, payload: { url: 'test' } };
    expect(setConnection('url', 'test')).toStrictEqual(result);
  });
});

describe('Tests for "connectionReducer"', () => {
  it('"connectionReducer" should work correctly with "setConnection" action', () => {
    const state = { url: 'hello' };
    const action = setConnection('url', 'test');
    const result = { url: 'test' };
    expect(connectionReducer(state, action)).toStrictEqual(result);
  });
});
