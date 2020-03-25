import React from 'react';
import { Layout } from 'antd';
import styles from './chat-container.module.less';

const { Content } = Layout;

export function ChatContainer() {
  return <Content className={styles['chat-container']}>Main content starts here</Content>;
}
