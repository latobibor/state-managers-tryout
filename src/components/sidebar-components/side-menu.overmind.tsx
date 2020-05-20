import React from 'react';
import { Menu } from 'antd';
import { SideChat } from './side-chat';
import styles from './side-menu.module.less';
import { getSimplifiedChats } from './side-menu.commons';
import { useOvermindActions, useOvermindState } from '../../overmind/config';

interface DispatchSelectedChatProps {
  key: string;
}

export function SideMenuOvermind() {
  const { selectChat } = useOvermindActions();
  const { activeChatId } = useOvermindState();

  function dispatchSelectedChat({ key }: DispatchSelectedChatProps) {
    selectChat(key);
  }

  const chats = getSimplifiedChats(useOvermindState());

  return (
    <div className={styles.sider}>
      <Menu
        className={styles['side-menu']}
        mode="inline"
        defaultSelectedKeys={[activeChatId || '']}
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
