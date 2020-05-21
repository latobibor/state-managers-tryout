import React from 'react';
import { Menu } from 'antd';
import { SideChat } from './side-chat';
import styles from './side-menu.module.less';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, SelectChatAction, DispatchAction } from '../../redux/root-reducer';
import { GlobalState } from '../../shared-types/global-state';
import { MenuItemProps, getSimplifiedChats } from './side-menu.commons';

interface DispatchSelectedChatProps {
  key: string;
}

export function SideMenuRedux() {
  const dispatch = useDispatch<DispatchAction<SelectChatAction>>();

  function dispatchSelectedChat({ key }: DispatchSelectedChatProps) {
    dispatch({ type: Actions.SelectChat, chatId: key });
  }

  const chats = useSelector<GlobalState, MenuItemProps[]>(getSimplifiedChats);
  const activeChatId = useSelector<GlobalState, string>(({activeChatId}) => activeChatId || '');

  return (
    <div className={styles.sider}>
      <Menu
        className={styles['side-menu']}
        mode="inline"
        defaultSelectedKeys={[activeChatId]}
        defaultOpenKeys={['sub1']}
        onSelect={dispatchSelectedChat}
      >
        {chats.map(({ name, lastLine, chatId }) => (
          <Menu.Item className={styles['side-menu-item']} key={chatId}>
            <SideChat name={name} lastLine={lastLine} />
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}
