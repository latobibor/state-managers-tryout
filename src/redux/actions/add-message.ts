import { AddMessageAction } from '../root-reducer';
import { GlobalState } from '../global-state';
import { MessageData } from '../../clients/messages-data';

export function addMessage(state: GlobalState, action: AddMessageAction): GlobalState {
  const { message } = action;
  const { chatId } = message;
  const { activeChatId } = state;

  const transformedMessage: MessageData = message.chatId === activeChatId ? { ...message, isRead: true } : message;

  const newChatsState = Object.assign({}, state.chats, {
    [chatId]: {
      recipients: state.chats[chatId].recipients,
      messages: [...state.chats[chatId].messages, transformedMessage],
    },
  });

  return { ...state, chats: newChatsState };
}
