import React from 'react';
import { CommentOutlined } from '@ant-design/icons';
import styles from './notifications.module.less';

export function Notifications() {
  return (
    <div className={styles['notification-container']}>
      <div className={styles.notification}>
        <CommentOutlined className={styles['notification-icon']} />
        &nbsp;
        <span className={`${styles['notification-number']} ${styles['active']}`}>3</span>
      </div>
    </div>
  );
}
