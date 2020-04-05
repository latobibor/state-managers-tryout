import React from 'react';
import { CommentOutlined } from '@ant-design/icons';
import styles from './notifications.module.less';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../redux/global-state';
import { Chat, MessageData } from '../../clients/messages-data';

function countNumberOfUnreadChats({ chats, currentUser }: GlobalState): number {
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

export function Notifications() {
  const numberOfUnreadChats = useSelector<GlobalState, number>(countNumberOfUnreadChats);

  return (
    <div className={styles['notification-container']}>
      <div className={styles.notification}>
        <CommentOutlined className={styles['notification-icon']} />
        &nbsp;
        {numberOfUnreadChats > 0 && (
          <span className={`${styles['notification-number']} ${styles['active']}`}>{numberOfUnreadChats}</span>
        )}
      </div>
    </div>
  );
}
