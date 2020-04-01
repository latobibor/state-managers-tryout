import React from 'react';
import styles from './chat-container.module.less';
import { Name } from './name';
import { MessageEditor } from './message-editor';
import { Messages } from './messages/messages';
import { GlobalState } from '../../redux/global-state';
import { useSelector } from 'react-redux';
import { MessageData } from '../../clients/messages-data';

type ContainerData = {
  senderName: string;
  messages: MessageData[];
};

function getSendersName(messages: MessageData[]): string {
  // this is not "production ready" but this repo is about trying out technologies
  // so this simplification is fine now
  return messages[0] ? messages[0].from.name : 'N/A';
}

function getMessagesForChatId(activeChatId: string, messages: MessageData[]): MessageData[] {
  return messages.filter((message) => message.chatId === activeChatId);
}

const dummyDataForEmptyCases: ContainerData = {
  senderName: 'N/A',
  messages: [],
};

function getActiveChat(globalState: GlobalState): ContainerData {
  console.log('GlobalState', globalState);

  if (!globalState) {
    return dummyDataForEmptyCases;
  }

  const { messages, activeChatId } = globalState;

  if (!activeChatId) {
    return dummyDataForEmptyCases;
  }

  const filteredMessages = getMessagesForChatId(activeChatId, messages);
  const senderName = getSendersName(filteredMessages);

  return {
    senderName,
    messages: filteredMessages,
  };
}

export function ChatContainer() {
  const { senderName, messages } = useSelector<GlobalState, ContainerData>(getActiveChat);

  return (
    <div className={styles['chat-container']}>
      <div>
        <Name name={senderName} />
      </div>
      <div className={styles['messages-container']}>
        <Messages messages={messages} />
      </div>
      <div>
        <MessageEditor />
      </div>
    </div>
  );
}
