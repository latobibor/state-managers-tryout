import React from 'react';
import { CloseOutlined, CaretRightOutlined } from '@ant-design/icons';
import styles from './socket-controls.module.less';

export function SocketControlsOvermind() {
  return (
    <div className={styles['socket-controls']}>
      <CaretRightOutlined onClick={() => console.log(true)} />
      <CloseOutlined onClick={() => console.log(false)} />
    </div>
  );
}
