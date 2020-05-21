import React from 'react';
import { CommentOutlined } from '@ant-design/icons';
import styles from './notifications.module.less';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../shared-types/global-state';
import { countNumberOfUnreadChats } from './notifications.common';

export function NotificationsRedux() {
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
