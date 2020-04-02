import { AddMessageAction } from '../root-reducer';
import { GlobalState } from '../global-state';

export function addMessage(state: GlobalState, action: AddMessageAction): GlobalState {
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
}
