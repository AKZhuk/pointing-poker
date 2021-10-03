import { popUpReducer, defaultPopUpState } from './popUpReducer';
import { SET_OPEN, setOpen } from './popUpActions';

describe('Test for popUp actions', () => {
  it('Action "setOpen" should working correctly', () => {
    const result = { type: SET_OPEN, payload: { isOpen: true } };
    expect(setOpen('isOpen', true)).toStrictEqual(result);
  });
});

describe('Tests for "popUpReducer"', () => {
  it('"popUpReducer" should work correctly with "setOpen" action', () => {
    const action = setOpen('deleteMemberPopUp', true);
    const result = { isOpen: false, deleteMemberPopUp: true };
    expect(popUpReducer(defaultPopUpState, action)).toStrictEqual(result);
  });
});
