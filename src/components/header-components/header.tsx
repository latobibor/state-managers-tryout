import React from 'react';
import { Menu, Typography, Col, Row } from 'antd';
import { Layout } from 'antd';
import styles from './header.module.less';
import { Notifications } from './notifications';

const { Text } = Typography;
const { Header } = Layout;

const titleSpanWidth = 4;
const menuSpanWidth = 12;
const notificationSpanWidth = 2;
const maxSpanWidth = 24;

export function HeaderWithNavigation() {
  return (
    <Header>
      <Row>
        <Col span={titleSpanWidth}>
          <Text className={styles.text}>State Management Try Outs</Text>
        </Col>
        <Col span={menuSpanWidth}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Redux version</Menu.Item>
          </Menu>
        </Col>
        <Col
          span={notificationSpanWidth}
          offset={maxSpanWidth - (notificationSpanWidth + menuSpanWidth + titleSpanWidth)}
        >
          <Notifications />
        </Col>
      </Row>
    </Header>
  );
}
