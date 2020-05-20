import React, { createRef, KeyboardEvent } from 'react';
import { Input, Button, Form } from 'antd';
import styles from './message-editor.module.less';
import { FormInstance } from 'antd/lib/form';
import { useOvermindActions, useOvermindState } from '../../overmind/config';

const { TextArea } = Input;

export function MessageEditorOvermind() {
  const formReference = createRef<FormInstance>();

  const { addMessage } = useOvermindActions();
  const { activeChatId, currentUser } = useOvermindState();

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
    addMessage(message);
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
