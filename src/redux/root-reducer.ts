import { GlobalState, initialState } from './global-state';
import { Message } from '../clients/messages-data';
import { Reducer } from 'redux';

export enum Actions {
  AddMessage = 'ADD MESSAGE',
}

export interface Action {
  type: Actions;
}

export interface MessageAction extends Action {
  type: Actions.AddMessage;
  message: Message;
}

export type CombinedActionType = MessageAction;

export const rootReducer: Reducer<GlobalState, CombinedActionType> = (
  state = initialState,
  action: CombinedActionType
): GlobalState => {
  switch (action.type) {
    case Actions.AddMessage:
      console.log(action.message);
      return { ...state, messages: [...state.messages, action.message] };
  }
};
