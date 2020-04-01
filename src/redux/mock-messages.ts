import { Chats } from '../clients/messages-data';
import { User } from '../clients/user-data';

export const dummyCurrentUser: User = {
  id: 'abc123',
  name: 'Sir Humphrey Codothon',
};

export const chatId1 = '12345';
export const person1: User = { name: 'Alberto Batepapo', id: 'usr134234' };
export const chatId2 = '1232abfd-345dfa';
export const person2: User = { name: 'Csevely Csenge', id: 'usr45643645' }; // 'cs' is pronounced 'ch' in Hungarian, while 'ly' is 'y'

export const mockChats: Chats = {
  [chatId1]: {
    recipients: [dummyCurrentUser, person1],
    messages: [
      {
        chatId: chatId1,
        from: person1,
        body: 'Well LOL, hello there, I kinda did something, but forgot, rotfl. Mao. I mean.',
        time: new Date('2020-04-01 12:12'),
        isRead: false,
      },
      {
        chatId: chatId1,
        from: dummyCurrentUser,
        body: 'Who are you and what did you do? This is creepy.',
        time: new Date('2020-04-01 12:13'),
        isRead: false,
      },
      {
        chatId: chatId1,
        from: person1,
        body:
          'Ah, sorry, I am Alberto Batepapo. I am a chatty person. I start to talk before I know what I want to say',
        time: new Date('2020-04-01 12:12'),
        isRead: false,
      },
      {
        chatId: chatId1,
        from: dummyCurrentUser,
        body: 'Yeah, OK, cool, but still creepy that you have messaged me',
        time: new Date('2020-04-01 12:14'),
        isRead: false,
      },
    ],
  },
  [chatId2]: {
    recipients: [dummyCurrentUser, person2],
    messages: [
      {
        chatId: chatId2,
        from: dummyCurrentUser,
        body: "Hi Csenge, how are you? I still don't know how to pronounce your name. :|",
        time: new Date('2020-04-01 12:10'),
        isRead: false,
      },
      {
        chatId: chatId2,
        from: person2,
        body: 'Kinda OK, this CoVid-19 thing depresses me a bit.',
        time: new Date('2020-04-01 12:12'),
        isRead: false,
      },
      {
        chatId: chatId2,
        from: dummyCurrentUser,
        body: 'Well, well, well, well... Who is not affected by it?',
        time: new Date('2020-04-01 12:15'),
        isRead: false,
      },
    ],
  },
};
