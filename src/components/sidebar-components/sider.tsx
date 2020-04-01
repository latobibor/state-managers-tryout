import React from 'react';
import { Menu } from 'antd';
import { SideChat } from './side-chat';
import styles from './sider.module.less';
import { useDispatch } from 'react-redux';
import { Actions, SelectChatAction, DispatchAction } from '../../redux/root-reducer';
import { SelectParam } from 'antd/lib/menu';

export function SideMenu() {
  const chatId1 = '12312';
  const chatId2 = '2423423';

  const dispatch = useDispatch<DispatchAction<SelectChatAction>>();

  function dispatchSelectedChat({ key }: SelectParam) {
    dispatch({ type: Actions.SelectChat, chatId: key });
  }

  return (
    <div className={styles.sider}>
      <Menu
        className={styles['side-menu']}
        mode="inline"
        defaultSelectedKeys={[chatId1]}
        defaultOpenKeys={['sub1']}
        onSelect={dispatchSelectedChat}
      >
        <Menu.Item className={styles['side-menu-item']} key={chatId1}>
          <SideChat chatId={chatId1} />
        </Menu.Item>
        <Menu.Item className={styles['side-menu-item']} key={chatId2}>
          <SideChat chatId={chatId2} />
        </Menu.Item>
      </Menu>
    </div>
  );
}
