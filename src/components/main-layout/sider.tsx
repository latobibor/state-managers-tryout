import React from 'react';
import { Menu, Layout } from 'antd';

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
        <Menu.Item key="1">Chat 1</Menu.Item>
        <Menu.Item key="2">Chat 2</Menu.Item>
      </Menu>
    </Sider>
  );
}
