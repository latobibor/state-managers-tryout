import React from 'react';
import styles from './chat-container.module.less';
import { Name } from './name';
import { MessageEditor } from './message-editor';
import { Messages } from './messages/messages';
import { useOvermindState } from '../../overmind/config';
import { getActiveChat } from './get-active-chat';

export function ChatContainerOvermind() {
  const { senderName, messages } = getActiveChat(useOvermindState());

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
