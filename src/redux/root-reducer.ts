import { GlobalState, initialState } from './global-state';
import { Message } from '../clients/messages-data';
import { Reducer } from 'redux';

export enum Actions {
  AddMessage = 'ADD MESSAGE',
  SelectChat = 'SELECT CHAT',
}

export interface Action {
  type: Actions;
}

export type DispatchAction<T extends Action> = (payload: T) => void;

export interface AddMessageAction extends Action {
  type: Actions.AddMessage;
  message: Message;
}

export interface SelectChatAction extends Action {
  type: Actions.SelectChat;
  chatId: string;
}

export type CombinedActionType = AddMessageAction | SelectChatAction;

export const rootReducer: Reducer<GlobalState, CombinedActionType> = (
  state = initialState,
  action: CombinedActionType
): GlobalState => {
  switch (action.type) {
    case Actions.AddMessage:
      console.log('Actions.AddMessage', action.message);
      return { ...state, messages: [...state.messages, action.message] };
    case Actions.SelectChat:
      console.log('Actions.SelectChat', action.chatId);
      return { ...state, activeChatId: action.chatId };
  }
};
