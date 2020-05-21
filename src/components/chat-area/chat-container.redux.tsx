import React from 'react';
import styles from './chat-container.module.less';
import { Name } from './name';
import { MessageEditorRedux } from './message-editor.redux';
import { Messages } from './messages/messages';
import { GlobalState } from '../../shared-types/global-state';
import { useSelector } from 'react-redux';
import { getActiveChat, ContainerData } from './get-active-chat';

export function ChatContainerRedux() {
  const { senderName, messages, currentUserId } = useSelector<GlobalState, ContainerData>(getActiveChat);

  return (
    <div className={styles['chat-container']}>
      <div>
        <Name name={senderName} />
      </div>
      <div className={styles['messages-container']}>
        <Messages messages={messages} currentUserId={currentUserId} />
      </div>
      <div>
        <MessageEditorRedux />
      </div>
    </div>
  );
}
