import React from 'react';
import { Menu, Typography } from 'antd';
import styles from './header.module.less';
import { Notifications } from './notifications';
import { SocketControlsRedux } from './socket-controls.redux';
import { Switch, Route, Link } from 'react-router-dom';
import { SocketControlsOvermind } from './socket-controls.overmind';

const { Text } = Typography;

export function HeaderWithNavigation() {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Text className={styles.text} ellipsis>
          State Management Try Outs
        </Text>
      </div>
      <div className={`${styles['header-group']} ${styles.growable}`}>
        <div className={styles['implementation-selector']}>
          <Menu className={styles['ant-menu-override']} theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">Redux version</Link>
            </Menu.Item>
          </Menu>
        </div>
        <div className={styles['implementation-selector']}>
          <Menu className={styles['ant-menu-override']} theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="2">
              <Link to="/overmind">Overmind.js version</Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
      <div className={styles['header-group']}>
        <div className={styles['socket-controls-container']}>
          <Switch>
            <Route path="/" exact>
              <SocketControlsRedux />
            </Route>
            <Route path="/overmind" exact>
              <SocketControlsOvermind />
            </Route>
          </Switch>
        </div>
        <div className={styles.notifications}>
          <Notifications />
        </div>
      </div>
    </div>
  );
}
