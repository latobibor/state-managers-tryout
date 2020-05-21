import { MessageData } from '../../clients/messages-data';
import { GlobalState } from '../../shared-types/global-state';
import { getSenderNameFromRecipients } from '../../common/current-user-calculations';

export type ContainerData = {
  senderName: string;
  messages: MessageData[];
  currentUserId: string;
};

export const dummyDataForEmptyCases: ContainerData = {
  senderName: 'N/A',
  messages: [],
  currentUserId: '',
};

export function getActiveChat(globalState: GlobalState): ContainerData {
  const { activeChatId, currentUser, chats } = globalState;

  if (!activeChatId) {
    return dummyDataForEmptyCases;
  }

  const { messages, recipients } = chats[activeChatId];
  const senderName = getSenderNameFromRecipients(currentUser, recipients);

  return {
    senderName,
    messages: messages,
    currentUserId: currentUser.id,
  };
}
