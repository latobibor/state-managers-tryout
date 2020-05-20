import { rootReducer, Actions } from './root-reducer';
import { GlobalState } from '../shared-types/global-state';
import { dummyCurrentUser } from './mock-messages';
import { User } from '../clients/user-data';

const activeChatId = '123';

const currentUser: User = {
  name: 'Nom Ames',
  id: 'usr2344',
};

const otherUser: User = {
  name: 'Other Mother',
  id: 'usr4565',
};

const mockInitialState: GlobalState = {
  activeChatId,
  currentUser,
  chats: {
    [activeChatId]: {
      messages: [],
      recipients: [otherUser, dummyCurrentUser],
    },
  },
};

const aNewMessage = {
  chatId: activeChatId,
  from: currentUser,
  body: 'hello. hello.',
  time: new Date(),
  isRead: false,
};

const secondMessage = {
  chatId: activeChatId,
  from: currentUser,
  body: 'second second',
  time: new Date(),
  isRead: false,
};

describe('RootReducer', () => {
  test('adding a new message creates new reference', () => {
    const resultState = rootReducer(mockInitialState, { type: Actions.AddMessage, message: aNewMessage });
    const resultState2 = rootReducer(resultState, { type: Actions.AddMessage, message: secondMessage });

    // toBe checks for reference equality, do not use toEqual here
    expect(resultState).not.toBe(resultState2);

    expect(resultState2.chats[activeChatId].messages[0].body).toEqual(aNewMessage.body);
    expect(resultState2.chats[activeChatId].messages[1].body).toEqual(secondMessage.body);
  });
});
