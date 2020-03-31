import React from 'react';
import { Message } from './message';
import styles from './messages.module.less';

export function Messages() {
  return (
    <div className={styles.messages}>
      <Message text="Well LOL, hello there, I kinda did something, but forgot, rotfl. Mao. I mean." isSent={false} />
      <Message text="Who are you? Honestly, I have no recollection." isSent={true} />
      <Message text="Ah, sorry, I am Delilah Desayuno. Funny that we have surnames about food." isSent={false} />
      <Message text="Yeay, OK, cool, but still creepy that you have messaged me" isSent={true} />
    </div>
  );
}
