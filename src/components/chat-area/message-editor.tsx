import React, { createRef, KeyboardEvent } from 'react';
import { Input, Button, Form } from 'antd';
import styles from './message-editor.module.less';
import { useDispatch } from 'react-redux';
import { Actions, DispatchAction, AddMessageAction } from '../../redux/root-reducer';
import { FormInstance } from 'antd/lib/form';

const { TextArea } = Input;

export function MessageEditor() {
  const formReference = createRef<FormInstance>();

  const dispatch = useDispatch<DispatchAction<AddMessageAction>>();

  // this sucks I need to find a way to load antd's own interface for this function
  function sendMessage(values: any) {
    const { message } = values;

    dispatch({ type: Actions.AddMessage, message });
    formReference.current?.resetFields();
  }

  function handleEnter(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (!e.shiftKey) {
      formReference.current?.submit();
    }
  }

  return (
    <div className={styles['message-editor']}>
      <Form name="message-editor" ref={formReference} onFinish={sendMessage}>
        <Form.Item name="message" className={styles['form-item']}>
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
