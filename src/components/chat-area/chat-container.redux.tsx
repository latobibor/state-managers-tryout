import React from 'react';
import styles from './chat-container.module.less';
import { Name } from './name';
import { MessageEditor } from './message-editor';
import { Messages } from './messages/messages';
import { GlobalState } from '../../shared-types/global-state';
import { useSelector } from 'react-redux';
import { MessageData } from '../../clients/messages-data';
import { getSenderNameFromRecipients } from '../../common/current-user-calculations';

type ContainerData = {
  senderName: string;
  messages: MessageData[];
};

const dummyDataForEmptyCases: ContainerData = {
  senderName: 'N/A',
  messages: [],
};

function getActiveChat(globalState: GlobalState): ContainerData {
  const { activeChatId, currentUser, chats } = globalState;

  if (!activeChatId) {
    return dummyDataForEmptyCases;
  }

  const { messages, recipients } = chats[activeChatId];
  const senderName = getSenderNameFromRecipients(currentUser, recipients);

  return {
    senderName,
    messages: messages,
  };
}

export function ChatContainerRedux() {
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
