import { IAction } from '../types';

export const SWITCH_IS_LOAD = 'SWITCH_IS_LOAD';

export const switchIsLoad = (): IAction => ({
  type: SWITCH_IS_LOAD,
  payload: null,
});
