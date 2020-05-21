import { GlobalState } from '../../shared-types/global-state';
import { MessageData, Chat } from '../../clients/messages-data';

export function countNumberOfUnreadChats({ chats, currentUser }: GlobalState): number {
  function countNumberOfUnreadMessages(accumulator: number, currentValue: MessageData): number {
    if (!currentValue.isRead && currentValue.from.id !== currentUser.id) {
      return accumulator + 1;
    }

    return accumulator;
  }

  function sumUnreadMessagesByChat(accumulator: number, currentValue: Chat): number {
    return accumulator + currentValue.messages.reduce<number>(countNumberOfUnreadMessages, 0);
  }

  return Object.values(chats).reduce<number>(sumUnreadMessagesByChat, 0);
}
