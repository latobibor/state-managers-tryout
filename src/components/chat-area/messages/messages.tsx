import React from 'react';
import { Message } from './message';
import styles from './messages.module.less';
import { MessageData } from '../../../clients/messages-data';
import { GlobalState } from '../../../redux/global-state';
import { useSelector } from 'react-redux';

interface MessagesProps {
  messages: MessageData[];
}

// todo: candidate for extraction
function getCurrentUserId(globalState: GlobalState): string {
  return globalState.currentUser.id;
}

export function Messages({ messages }: MessagesProps) {
  const currentUserId = useSelector<GlobalState, string>(getCurrentUserId);

  return (
    <div className={styles.messages}>
      {messages.map((message) => (
        <Message key={message.time.toISOString()} text={message.body} isSent={currentUserId === message.from.id} />
      ))}
    </div>
  );
}
