import React from 'react';
import { Menu, Layout } from 'antd';
import { SideChat } from './side-chat';
import styles from './sider.module.less';

const { Sider } = Layout;

export function SideMenu() {
  return (
    <Sider width={300} breakpoint="lg" collapsedWidth="0" className={'site-layout-background'}>
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
    </Sider>
  );
}
