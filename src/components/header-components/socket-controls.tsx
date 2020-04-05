import React from 'react';
import { Server, WebSocket } from 'mock-socket';
import { connect, ConnectedProps } from 'react-redux';
import { DispatchAction, Actions, CombinedActionType } from '../../redux/root-reducer';
import { CloseOutlined, CaretRightOutlined } from '@ant-design/icons';
import styles from './socket-controls.module.less';
import { GlobalState } from '../../redux/global-state';
import { MessageData } from '../../clients/messages-data';
import { createMessage } from '../../clients/message-websocket';

interface SocketControlsClassProps {
  connection: WebSocket;
  server: Server;
  intervalId: number;
}

interface Dispatchers {
  sendMessage: (message: MessageData) => void;
  changeMessageGenerationTo: (automaticallySendMessages: boolean) => void;
}

function mapDispatchToProps(dispatch: DispatchAction<CombinedActionType>): Dispatchers {
  return {
    sendMessage: (message: MessageData) => {
      dispatch({
        type: Actions.AddMessage,
        message,
      });
    },
    changeMessageGenerationTo: (automaticallySendMessages: boolean) => {
      console.log('change message generation to', automaticallySendMessages);

      dispatch({
        type: Actions.ToggleMessageGeneration,
        automaticallySendMessages,
      });
    },
  };
}

function mapStateToProps({ automaticallySendMessages }: GlobalState): { automaticallySendMessages: boolean } {
  return {
    automaticallySendMessages,
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

class SocketControlsCore extends React.Component<PropsFromRedux> implements SocketControlsClassProps {
  connection: WebSocket;
  server: Server;
  intervalId: number = 0;

  constructor(props: PropsFromRedux) {
    super(props);
    const mockUrl = 'wss://fake-url.com';

    this.server = new Server(mockUrl);
    this.connection = new WebSocket(mockUrl);
    this.connection.onmessage = (event: Event) => this.props.sendMessage((event as MessageEvent).data);

    this.setMockConnection();
    this.toggleRandomMessages();
  }

  componentDidUpdate(prevProps: PropsFromRedux) {
    if (prevProps.automaticallySendMessages !== this.props.automaticallySendMessages) {
      this.toggleRandomMessages();
    }
  }

  setMockConnection() {
    this.server.on('connection', (socket) => {
      socket.on('message', (data) => {
        socket.send(data);
      });
    });
  }

  toggleRandomMessages() {
    const { automaticallySendMessages } = this.props;

    if (automaticallySendMessages) {
      this.intervalId = (setInterval(() => {
        const message = createMessage(!!(Math.random() < 0.5));

        this.props.sendMessage(message);
      }, 3000) as unknown) as number;
      return;
    }

    clearInterval(this.intervalId);
  }

  render() {
    const { automaticallySendMessages, changeMessageGenerationTo } = this.props;
    const playButtonStyle = (automaticallySendMessages && styles.disabled) || '';
    const stopButtonStyle = (!automaticallySendMessages && styles.disabled) || '';

    return (
      <div className={styles['socket-controls']}>
        <CaretRightOutlined className={playButtonStyle} onClick={() => changeMessageGenerationTo(true)} />
        <CloseOutlined className={stopButtonStyle} onClick={() => changeMessageGenerationTo(false)} />
      </div>
    );
  }
}

export const SocketControls = connector(SocketControlsCore);
