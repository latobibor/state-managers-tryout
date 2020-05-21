import React from 'react';
import { Message } from './message';
import styles from './messages.module.less';
import { MessageData } from '../../../clients/messages-data';

interface MessagesProps {
  messages: MessageData[];
  currentUserId: string;
}

function sortMessagesByTime(a: MessageData, b: MessageData): number {
  if (a.time > b.time) {
    return 1;
  }

  if (a.time === b.time) {
    return 0;
  }

  return -1;
}

export function Messages({ messages, currentUserId }: MessagesProps) {
  const sortedMessages = [...messages].sort(sortMessagesByTime);

  return (
    <div className={styles.messages}>
      {sortedMessages.map((message) => (
        <Message key={message.time.toISOString()} text={message.body} isSent={currentUserId === message.from.id} />
      ))}
    </div>
  );
}
