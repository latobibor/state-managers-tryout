import React from 'react';
import { Menu, Typography } from 'antd';
import styles from './header.module.less';
import { Notifications } from './notifications';
import { SocketControls } from './socket-controls';

const { Text } = Typography;

export function HeaderWithNavigation() {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Text className={styles.text} ellipsis>
          State Management Try Outs
        </Text>
      </div>
      <div className={styles['implementation-selector']}>
        <Menu className={styles['ant-menu-override']} theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Redux version</Menu.Item>
        </Menu>
      </div>
      <div className={styles['socket-controls-container']}>
        <SocketControls />
      </div>
      <div className={styles.notifications}>
        <Notifications />
      </div>
    </div>
  );
}
