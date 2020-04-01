import React from 'react';
import { ExportOutlined } from '@ant-design/icons';
import { Row, Typography } from 'antd';

const { Text } = Typography;

interface SideChatProps {
  chatId: string;
  name: string;
  lastLine: string;
}

export function SideChat({ chatId, name, lastLine }: SideChatProps) {
  return (
    <div>
      <Row>
        <Text strong ellipsis>
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
