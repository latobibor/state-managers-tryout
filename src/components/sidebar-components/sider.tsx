import React from 'react';
import { Menu } from 'antd';
import { SideChat } from './side-chat';
import styles from './sider.module.less';

export function SideMenu() {
  return (
    <div className={styles.sider}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item className={styles['side-menu-item']} key="1">
          <SideChat />
        </Menu.Item>
        <Menu.Item className={styles['side-menu-item']} key="2">
          <SideChat />
        </Menu.Item>
      </Menu>
    </div>
  );
}
