import React from 'react';
import styles from './App.module.less';
import { Layout } from 'antd';
import { HeaderWithNavigation } from './components/header-components/header';
import { SideMenu } from './components/sidebar-components/sider';
import { ChatContainer } from './components/chat-area/chat-container';

const { Footer } = Layout;

function App() {
  return (
    <Layout className={styles.app}>
      <HeaderWithNavigation />
      <Layout className={styles['app-content']}>
        <SideMenu />
        <Layout className={styles['app-chat-content']}>
          <ChatContainer />
        </Layout>
      </Layout>
      <Footer className={styles['app-footer']}>
        <span>Check out the source of the other implementations!</span>
      </Footer>
    </Layout>
  );
}

export default App;
