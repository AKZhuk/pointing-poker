import { IRoom } from '../../../types';
import { defaultRoomState, roomReducer } from './roomReducer';
import {
  ADD_ROOM,
  addRoom,
  SET_ROOM,
  setRoom,
  SET_SETTING,
  setSetting,
  ADD_CARD,
  addCard,
  REMOVE_CARD,
  removeCard,
} from './roomActions';

describe('Test for room actions', () => {
  it('Action "addRoom" should working correctly', () => {
    const TestRoom: IRoom = JSON.parse(JSON.stringify(defaultRoomState));
    TestRoom.route = 'game';
    const result = { type: ADD_ROOM, payload: TestRoom };
    expect(addRoom(TestRoom)).toStrictEqual(result);
  });
  it('Action "setRoom" should working correctly', () => {
    const TestRoom: IRoom = JSON.parse(JSON.stringify(defaultRoomState));
    TestRoom.route = 'result';
    const result = { type: SET_ROOM, payload: { route: 'result' } };
    expect(setRoom('route', 'result')).toStrictEqual(result);
  });
  it('Action "setSetting" should working correctly', () => {
    const TestRoom: IRoom = JSON.parse(JSON.stringify(defaultRoomState));
    TestRoom.gameSettings.flipCardsWhenAllVoted = true;
    const result = { type: SET_SETTING, payload: { flipCardsWhenAllVoted: true } };
    expect(setSetting('flipCardsWhenAllVoted', true)).toStrictEqual(result);
  });
  it('Action "addCard" should working correctly', () => {
    const result = { type: ADD_CARD, payload: { card: null } };
    expect(addCard()).toStrictEqual(result);
  });
  it('Action "removeCard" should working correctly', () => {
    const result = { type: REMOVE_CARD, payload: { card: null } };
    expect(removeCard()).toStrictEqual(result);
  });
});

describe('Tests for "roomReducer"', () => {
  it('"roomReducer" should work correctly with "addRoom" action', () => {
    const TestRoom: IRoom = JSON.parse(JSON.stringify(defaultRoomState));
    const action = addRoom(TestRoom);
    expect(roomReducer(defaultRoomState, action)).toStrictEqual(TestRoom);
  });
  it('"roomReducer" should work correctly with "setRoom" action', () => {
    const TestRoom: IRoom = JSON.parse(JSON.stringify(defaultRoomState));
    const action = setRoom('route', 'result');
    TestRoom.route = 'result';
    expect(roomReducer(defaultRoomState, action)).toStrictEqual(TestRoom);
  });
  it('"roomReducer" should work correctly with "setSetting" action', () => {
    const TestRoom: IRoom = JSON.parse(JSON.stringify(defaultRoomState));
    const action = setSetting('isTimerNeeded', true);
    TestRoom.gameSettings.isTimerNeeded = true;
    expect(roomReducer(defaultRoomState, action)).toStrictEqual(TestRoom);
  });
  it('"roomReducer" should work correctly with "addCard" action', () => {
    const TestRoom: IRoom = JSON.parse(JSON.stringify(defaultRoomState));
    const action = addCard();
    TestRoom.gameSettings.cards = defaultRoomState.gameSettings.cards + 1;
    expect(roomReducer(defaultRoomState, action)).toStrictEqual(TestRoom);
  });
  it('"roomReducer" should work correctly with "removeCard" action', () => {
    const TestRoom: IRoom = JSON.parse(JSON.stringify(defaultRoomState));
    const action = removeCard();
    TestRoom.gameSettings.cards = defaultRoomState.gameSettings.cards - 1;
    expect(roomReducer(defaultRoomState, action)).toStrictEqual(TestRoom);
  });
});
