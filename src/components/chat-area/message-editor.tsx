import React from 'react';
import { Input, Button } from 'antd';
import styles from './message-editor.module.less';

const { TextArea } = Input;

export function MessageEditor() {
  return (
    <div className={styles['message-editor']}>
      <TextArea rows={5} />
      <Button className={styles['send-button']} type="primary">
        Send
      </Button>
    </div>
  );
}
