import React from 'react';
import { Layout } from 'antd';
import styles from './chat-container.module.less';
import { Name } from './name';
import { MessageEditor } from './message-editor';
import { Messages } from './messages/messages';

const { Content } = Layout;

export function ChatContainer() {
  return (
    <Content className={styles['chat-container']}>
      <div>
        <Name />
      </div>
      <div className={styles['messages-container']}>
        <Messages />
      </div>
      <div>
        <MessageEditor />
      </div>
    </Content>
  );
}
