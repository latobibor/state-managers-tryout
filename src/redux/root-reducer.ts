import { GlobalState, initialState } from '../shared-types/global-state';
import { MessageData } from '../clients/messages-data';
import { Reducer } from 'redux';
import { addMessage } from './actions/add-message';
import { selectChat } from './actions/select-chat';

export enum Actions {
  _Init = '@@redux/INIT',
  AddMessage = 'ADD MESSAGE',
  SelectChat = 'SELECT CHAT',
  ToggleMessageGeneration = 'TOGGLE MESSAGE GENERATION',
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

export interface ToggleMessageGenerationAction extends Action {
  type: Actions.ToggleMessageGeneration;
  automaticallySendMessages: boolean;
}

export interface _InitAction extends Action {
  type: Actions._Init;
}

// todo: there should be a helper for this (written by me or a lib); this is not gonna scale
export type CombinedActionType = AddMessageAction | SelectChatAction | ToggleMessageGenerationAction | _InitAction;

export const rootReducer: Reducer<GlobalState, CombinedActionType> = (
  state = initialState,
  action: CombinedActionType
): GlobalState => {
  if (action.type.toString().startsWith(Actions._Init.toString())) {
    return state;
  }

  switch (action.type) {
    case Actions.AddMessage:
      return addMessage(state, action);
    case Actions.SelectChat:
      return selectChat(state, action);
    case Actions.ToggleMessageGeneration:
      return { ...state, automaticallySendMessages: action.automaticallySendMessages };
    default:
      throw new Error(`Event name ${action.type} was not recognized; please implement it`);
  }
};
