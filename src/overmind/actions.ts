import { Action } from 'overmind';
import { MessageData } from '../clients/messages-data';

export const addMessage: Action<MessageData> = function addMessage({ state }, message: MessageData) {
  const { chatId } = message;
  const { activeChatId } = state;

  const transformedMessage: MessageData = message.chatId === activeChatId ? { ...message, isRead: true } : message;

  state.chats = Object.assign({}, state.chats, {
    [chatId]: {
      recipients: state.chats[chatId].recipients,
      messages: [...state.chats[chatId].messages, transformedMessage],
    },
  });
};

export const selectChat: Action<string> = function selectChat({ state }, chatId: string) {
  const { chats } = state;

  // this is super not performant in the long run; but now it's OK for the example
  const readMessages = chats[chatId].messages.map((message) => ({ ...message, isRead: true }));
  const updatedChat = {
    [chatId]: {
      ...chats[chatId],
      messages: readMessages,
    },
  };

  state.activeChatId = chatId;
  state.chats = { ...chats, ...updatedChat };
};

export const changeMessageGenerationTo: Action<boolean> = function changeMessageGenerationTo({ state }, to: boolean) {
  state.automaticallySendMessages = to;
};
