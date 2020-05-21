import { Chats } from '../clients/messages-data';
import { User } from '../clients/user-data';
import { mockChats, dummyCurrentUser, chatId1 } from '../common/mock-messages';

export type GlobalState = {
  activeChatId: string | null;
  currentUser: User;
  chats: Chats;
  automaticallySendMessages: boolean;
};

export const initialState: GlobalState = {
  activeChatId: chatId1,
  currentUser: dummyCurrentUser,
  chats: mockChats,
  automaticallySendMessages: true,
};
