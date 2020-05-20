import React from 'react';
import { Message } from './message';
import styles from './messages.module.less';
import { MessageData } from '../../../clients/messages-data';
import { GlobalState } from '../../../shared-types/global-state';
import { useSelector } from 'react-redux';

interface MessagesProps {
  messages: MessageData[];
}

// todo: candidate for extraction
function getCurrentUserId(globalState: GlobalState): string {
  return globalState.currentUser.id;
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

export function Messages({ messages }: MessagesProps) {
  const currentUserId = useSelector<GlobalState, string>(getCurrentUserId);

  const sortedMessages = messages.sort(sortMessagesByTime);

  return (
    <div className={styles.messages}>
      {sortedMessages.map((message) => (
        <Message key={message.time.toISOString()} text={message.body} isSent={currentUserId === message.from.id} />
      ))}
    </div>
  );
}
