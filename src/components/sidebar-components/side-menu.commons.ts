import { GlobalState } from '../../shared-types/global-state';
import { chatId1, person1, chatId2, person2 } from '../../common/mock-messages';
import { getSenderNameFromRecipients } from '../../common/current-user-calculations';
import { MessageData } from '../../clients/messages-data';

export type MenuItemProps = {
  chatId: string;
  name: string;
  lastLine: string;
};

export function getSimplifiedChats(globalState: GlobalState): MenuItemProps[] {
  if (!globalState) {
    return [
      {
        chatId: chatId1,
        name: person1.name,
        lastLine: '',
      },
      {
        chatId: chatId2,
        name: person2.name,
        lastLine: '',
      },
    ];
  }

  const { chats, currentUser } = globalState;

  const chatIds = Object.keys(chats);

  // this is an example just to play with redux, hooks and others, so this is not production but it's OK now
  return chatIds.map((chatId) => ({
    chatId,
    name: getSenderNameFromRecipients(currentUser, chats[chatId].recipients),
    lastLine: [...chats[chatId].messages].sort(reverseSortByTime)[0].body,
  }));
}

export function reverseSortByTime(a: MessageData, b: MessageData): number {
  if (a.time > b.time) {
    return -1;
  }

  if (a.time === b.time) {
    return 0;
  }

  if (a.time < b.time) {
    return 1;
  }

  return 0;
}
