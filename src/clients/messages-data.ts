export type Message = {
  chatId: string;
  from: string;
  body: string;
  time: Date;
  isRead: boolean;
};
