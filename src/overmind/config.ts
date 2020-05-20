import { initialState } from '../shared-types/global-state';
import { IConfig } from 'overmind';
import * as actions from './actions';
import { createHook, createStateHook, createActionsHook, createEffectsHook, createReactionHook } from 'overmind-react';

export const config = {
  state: initialState,
  actions,
};

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const useOvermind = createHook<typeof config>();
export const useOvermindState = createStateHook<typeof config>();
export const useOvermindActions = createActionsHook<typeof config>();
export const useOvermindEffects = createEffectsHook<typeof config>();
export const useOvermindReaction = createReactionHook<typeof config>();
