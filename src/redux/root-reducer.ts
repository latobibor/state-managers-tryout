import { GlobalState, initialState } from './global-state';
import { MessageData } from '../clients/messages-data';
import { Reducer } from 'redux';

export enum Actions {
  _Init = '@@redux/INIT',
  AddMessage = 'ADD MESSAGE',
  SelectChat = 'SELECT CHAT',
}

export interface Action {
  type: Actions;
}

export type DispatchAction<T extends Action> = (payload: T) => void;

export interface AddMessageAction extends Action {
  type: Actions.AddMessage;
  message: MessageData;
}

export interface SelectChatAction extends Action {
  type: Actions.SelectChat;
  chatId: string;
}

export interface _InitAction extends Action {
  type: Actions._Init;
}

export type CombinedActionType = AddMessageAction | SelectChatAction | _InitAction;

export const rootReducer: Reducer<GlobalState, CombinedActionType> = (
  state = initialState,
  action: CombinedActionType
): GlobalState => {
  if (action.type.toString().startsWith(Actions._Init.toString())) {
    return state;
  }

  switch (action.type) {
    case Actions.AddMessage:
      const { message } = action;
      const { chatId } = message;
      console.log('Actions.AddMessage', action.message);

      const newChatsState = Object.assign({}, state.chats, {
        [chatId]: {
          recipients: state.chats[chatId].recipients,
          messages: [...state.chats[chatId].messages, message],
        },
      });

      return { ...state, chats: newChatsState };
    case Actions.SelectChat:
      console.log('Actions.SelectChat', action.chatId);
      return { ...state, activeChatId: action.chatId };
    default:
      throw new Error(`Event name ${action.type} was not recognized; please implement it`);
  }
};
