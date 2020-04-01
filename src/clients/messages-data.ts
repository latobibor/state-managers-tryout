import { User } from './user-data';

export type MessageData = {
  chatId: string;
  from: User;
  body: string;
  time: Date;
  isRead: boolean;
};
