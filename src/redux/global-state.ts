import { Message } from '../clients/messages-data';
import { User } from '../clients/user-data';
import { mockMessages, dummyCurrentUser } from './mock-messages';

export type GlobalState = {
  activeChatId: string | undefined;
  currentUser: User;
  messages: Message[];
};

export const initialState = {
  activeChatId: undefined,
  currentUser: dummyCurrentUser,
  messages: mockMessages,
};
