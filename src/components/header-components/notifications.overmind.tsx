import React from 'react';
import { CommentOutlined } from '@ant-design/icons';
import styles from './notifications.module.less';
import { countNumberOfUnreadChats } from './notifications.common';
import { useOvermindState } from '../../overmind/config';

export function NotificationsOvermind() {
  const numberOfUnreadChats = countNumberOfUnreadChats(useOvermindState());

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
