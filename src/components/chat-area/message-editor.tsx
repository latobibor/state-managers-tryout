import React, { createRef, KeyboardEvent } from 'react';
import { Input, Button, Form } from 'antd';
import styles from './message-editor.module.less';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, DispatchAction, AddMessageAction } from '../../redux/root-reducer';
import { FormInstance } from 'antd/lib/form';
import { GlobalState } from '../../shared-types/global-state';
import { User } from '../../clients/user-data';

const { TextArea } = Input;

type MessageEditorProps = {
  activeChatId: string | undefined;
  currentUser: User;
};

export function MessageEditor() {
  const formReference = createRef<FormInstance>();

  const dispatch = useDispatch<DispatchAction<AddMessageAction>>();
  const { activeChatId, currentUser } = useSelector<GlobalState, MessageEditorProps>(({ activeChatId, currentUser}) => ({
    activeChatId,
    currentUser
  }))

  // this sucks I need to find a way to load antd's own interface for this function
  function sendMessage(values: any) {
    const { messageBody } = values;

    const message = {
      // todo: the || '' should be unnecessary
      chatId: activeChatId || '',
      from: currentUser,
      body: messageBody,
      time: new Date(),
      isRead: true,
    }

    formReference.current?.resetFields();
    dispatch({ type: Actions.AddMessage, message });
  }

  function handleEnter(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (!e.shiftKey) {
      formReference.current?.submit();
    }
  }

  // todo: disable on missing activeChatId

  return (
    <div className={styles['message-editor']}>
      <Form name="message-editor" ref={formReference} onFinish={sendMessage}>
        <Form.Item name="messageBody" className={styles['form-item']}>
          <TextArea rows={5} onPressEnter={handleEnter} />
        </Form.Item>
        <Form.Item className={styles['form-item']}>
          <Button className={styles['send-button']} type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
