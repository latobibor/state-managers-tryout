import { Chats } from '../clients/messages-data';
import { User } from '../clients/user-data';
import { mockChats, dummyCurrentUser } from './mock-messages';

export type GlobalState = {
  activeChatId: string | undefined;
  currentUser: User;
  chats: Chats;
};

export const initialState = {
  activeChatId: undefined,
  currentUser: dummyCurrentUser,
  chats: mockChats,
};
