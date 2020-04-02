import { GlobalState } from '../global-state';
import { SelectChatAction } from '../root-reducer';

export function selectChat(state: GlobalState, { chatId }: SelectChatAction): GlobalState {
  const { chats } = state;

  // this is super not performant in the long run; but now it's OK for the example
  const readMessages = chats[chatId].messages.map((message) => ({ ...message, isRead: true }));
  const updatedChat = {
    [chatId]: {
      ...chats[chatId],
      messages: readMessages,
    },
  };

  return { ...state, activeChatId: chatId, chats: { ...chats, ...updatedChat } };
}
