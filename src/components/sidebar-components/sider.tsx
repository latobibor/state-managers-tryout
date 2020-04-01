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

  const { messages } = globalState;

  // this is an example just to play with redux, hooks and others, so this is not production but it's OK now
  return [getNameAndLastMessageByChatId(chatId1, messages), getNameAndLastMessageByChatId(chatId2, messages)];
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

function getNameAndLastMessageByChatId(
  chatId: string,
  messages: MessageData[]
): { chatId: string; name: string; lastLine: string } {
  const filteredSortedMessages = messages
    .filter((message) => message.chatId === chatId)
    .sort(reverseSortByTime);

  const lastMessage = filteredSortedMessages[0];

  return {
    chatId,
    name: lastMessage.from.name,
    lastLine: lastMessage.body,
  };
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
        {chats.map(({name, lastLine, chatId }) => (
          <Menu.Item className={styles['side-menu-item']} key={chatId}>
            <SideChat chatId={chatId} name={name} lastLine={lastLine} />
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}
