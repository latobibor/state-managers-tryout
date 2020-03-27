import React from 'react';
import { Input, Button, Form } from 'antd';
import styles from './message-editor.module.less';
import { useDispatch } from 'react-redux';
import { Actions } from '../../redux/root-reducer';

const { TextArea } = Input;

export function MessageEditor() {
  const dispatch = useDispatch();

  // this sucks I need to find a way to load antd's own interface for this function
  function sendMessage(values: any) {
    const { message } = values;
    console.log('ENTER', message);

    dispatch({ type: Actions.AddMessage, message });
  }

  return (
    <div className={styles['message-editor']}>
      <Form name="message-editor" onFinish={sendMessage}>
        <Form.Item name="message">
          <TextArea rows={5} />
        </Form.Item>
        <Form.Item>
          <Button className={styles['send-button']} type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
