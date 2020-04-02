import { User } from './user-data';

export type MessageData = {
  chatId: string;
  from: User;
  body: string;
  time: Date;
  isRead: boolean;
};

export type Chats = {
  [chatId: string]: Chat;
};

export type Chat = {
  recipients: User[];
  messages: MessageData[];
};
