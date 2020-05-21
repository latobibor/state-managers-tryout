import { createStore } from 'redux';
import { GlobalState } from '../shared-types/global-state';
import { rootReducer, CombinedActionType } from './root-reducer';

export const store = createStore<GlobalState, CombinedActionType, null, null>(rootReducer);
