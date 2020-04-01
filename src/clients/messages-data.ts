import { User } from './user-data';

export type Message = {
  chatId: string;
  from: User;
  body: string;
  time: Date;
  isRead: boolean;
};
