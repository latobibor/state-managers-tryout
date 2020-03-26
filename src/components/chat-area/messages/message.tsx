import React from 'react';
import styles from './message.module.less';

interface Props {
  isSent: boolean;
  text: string;
}

export function Message({ isSent, text }: Props) {
  const additionalStyle = isSent ? styles['message-sent'] : styles['message-received'];
  return <div className={`${styles.message} ${additionalStyle}`}>{text}</div>;
}
