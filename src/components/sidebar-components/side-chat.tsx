import React from 'react';
import { ExportOutlined } from '@ant-design/icons';
import { Row, Typography } from 'antd';
import styles from './side-chat.module.less';

const { Text } = Typography;

interface SideChatProps {
  name: string;
  lastLine: string;
}

export function SideChat({ name, lastLine }: SideChatProps) {
  return (
    <div>
      <Row>
        <Text strong ellipsis className={styles.title}>
          {name}
        </Text>
      </Row>
      <Row>
        <Text ellipsis>
          <ExportOutlined />
          {lastLine}
        </Text>
      </Row>
    </div>
  );
}
