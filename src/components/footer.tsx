import React from 'react';
import styles from './footer.module.less';

export function Footer() {
  return (
    <div className={styles['app-footer']}>
      <div className={styles['footer-content']}>Check out the source of the other implementations!</div>
    </div>
  );
}
