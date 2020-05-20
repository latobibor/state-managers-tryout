import React from 'react';
import { CloseOutlined, CaretRightOutlined } from '@ant-design/icons';
import styles from './socket-controls.module.less';
import { MessageData } from '../../clients/messages-data';
import { createMessage } from '../../clients/message-websocket';
import { connection } from '../../common/web-socket';
import { connect, Connect } from '../../overmind/config';

interface SocketControlsClassProps {
  intervalId: number;
}

type PropsFromOvermind = {} & Connect;

class SocketControlsCore extends React.Component<PropsFromOvermind> implements SocketControlsClassProps {
  intervalId: number = 0;

  constructor(props: PropsFromOvermind) {
    super(props);

    connection.onmessage = (event: Event) => this.sendMessage((event as MessageEvent).data);
    this.toggleRandomMessages(true);
    this.changeMessageGeneration = this.changeMessageGeneration.bind(this);
  }

  toggleRandomMessages(automaticallySendMessages: boolean) {
    if (automaticallySendMessages) {
      this.intervalId = (setInterval(() => {
        const message = createMessage(!!(Math.random() < 0.5));

        this.sendMessage(message);
      }, 3000) as unknown) as number;
      return;
    }

    clearInterval(this.intervalId);
  }

  sendMessage(message: MessageData): void {
    const {
      actions: { addMessage },
    } = this.props.overmind;

    addMessage(message);
  }

  changeMessageGeneration(to: boolean): void {
    const { changeMessageGenerationTo } = this.props.overmind.actions;
    changeMessageGenerationTo(to);
    this.toggleRandomMessages(to);
  }

  render() {
    const { automaticallySendMessages } = this.props.overmind.state;
    const { changeMessageGeneration } = this;

    const playButtonStyle = (automaticallySendMessages && styles.disabled) || '';
    const stopButtonStyle = (!automaticallySendMessages && styles.disabled) || '';

    return (
      <div className={styles['socket-controls']}>
        <CaretRightOutlined className={playButtonStyle} onClick={() => changeMessageGeneration(true)} />
        <CloseOutlined className={stopButtonStyle} onClick={() => changeMessageGeneration(false)} />
      </div>
    );
  }
}

export const SocketControlsOvermind = connect(SocketControlsCore);
