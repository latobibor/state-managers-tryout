import React from 'react';
import styles from './chat-container.module.less';
import { Name } from './name';
import { MessageEditor } from './message-editor';
import { Messages } from './messages/messages';

export function ChatContainer() {
  return (
    <div className={styles['chat-container']}>
      <div className={styles['chat-title']}>
        <Name />
      </div>
      <div className={styles['messages-container']}>
        <Messages />
      </div>
      <div className={styles['chat-message-editor']}>
        <MessageEditor />
      </div>
    </div>
  );
}
