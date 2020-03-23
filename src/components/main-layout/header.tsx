import React from 'react';
import { Menu, Typography, Col, Row } from 'antd';
import { Layout } from 'antd';
import styles from './header.module.less';

const { Text } = Typography;
const { Header } = Layout;

export function HeaderWithNavigation() {
  return (
    // <Menu theme="dark" mode="horizontal" >
    // <Menu.Item key="1">Redux version</Menu.Item>
    // </Menu>
    <Header>
      <Row>
        <Col span={4}>
          <Text className={styles.text}>State Management Try Outs</Text>
        </Col>
        <Col span={12}>
          <Menu className={styles.menu} theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Redux version</Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Header>
  );
}
