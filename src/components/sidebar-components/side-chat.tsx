import React from 'react';
import { ExportOutlined } from '@ant-design/icons';
import { Row, Typography } from 'antd';

const { Text } = Typography;

export function SideChat() {
  return (
    <div>
      <Row>
        <Text strong ellipsis>Alberto Batepapo</Text>
      </Row>
      <Row>
        <Text ellipsis>
          <ExportOutlined />I wish you could see my other messages, but hey, that's what we have now.
        </Text>
      </Row>
    </div>
  );
}
