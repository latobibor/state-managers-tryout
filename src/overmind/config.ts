import { initialState } from '../shared-types/global-state';
import { IConfig } from 'overmind';
import * as actions from './actions';

export const config = {
  state: initialState,
  actions,
};

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}
