import React from 'react';
import { Menu } from 'antd';
import { SideChat } from './side-chat';
import styles from './sider.module.less';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, SelectChatAction, DispatchAction } from '../../redux/root-reducer';
import { SelectParam } from 'antd/lib/menu';
import { chatId1, chatId2, person1, person2 } from '../../redux/mock-messages';
import { GlobalState } from '../../redux/global-state';
import { MessageData } from '../../clients/messages-data';
import { getSenderNameFromRecipients } from '../../common/current-user-calculations';

type MenuItemProps = {
  chatId: string;
  name: string;
  lastLine: string;
};

function getSimplifiedChats(globalState: GlobalState): MenuItemProps[] {
  if (!globalState) {
    return [
      {
        chatId: chatId1,
        name: person1.name,
        lastLine: '',
      },
      {
        chatId: chatId2,
        name: person2.name,
        lastLine: '',
      },
    ];
  }

  const { chats, currentUser } = globalState;

  const chatIds = Object.keys(chats);

  // this is an example just to play with redux, hooks and others, so this is not production but it's OK now
  return chatIds.map((chatId) => ({
    chatId,
    name: getSenderNameFromRecipients(currentUser, chats[chatId].recipients),
    lastLine: chats[chatId].messages.sort(reverseSortByTime)[0].body,
  }));
}

function reverseSortByTime(a: MessageData, b: MessageData): number {
  if (a.time > b.time) {
    return -1;
  }

  if (a.time === b.time) {
    return 0;
  }

  if (a.time < b.time) {
    return 1;
  }

  return 0;
}

export function SideMenu() {
  const dispatch = useDispatch<DispatchAction<SelectChatAction>>();

  function dispatchSelectedChat({ key }: SelectParam) {
    dispatch({ type: Actions.SelectChat, chatId: key });
  }

  const chats = useSelector<GlobalState, MenuItemProps[]>(getSimplifiedChats);

  return (
    <div className={styles.sider}>
      <Menu
        className={styles['side-menu']}
        mode="inline"
        defaultSelectedKeys={[chatId1]}
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
