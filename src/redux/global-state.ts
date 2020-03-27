import { Message } from '../clients/messages-data';
import { User } from '../clients/user-data';

export type GlobalState = {
  activeChatId: string | undefined;
  currentUser: User;
  messages: Message[];
};

const dummyCurrentUser: User = {
  id: 'abc123',
  name: 'Sir Humphrey Codothon',
};

export const initialState = {
  activeChatId: undefined,
  currentUser: dummyCurrentUser,
  messages: [],
};
