import React from 'react';
import styles from './App.module.less';
import { HeaderWithNavigation } from './components/header-components/header';
import { SideMenu } from './components/sidebar-components/sider';
import { ChatContainer } from './components/chat-area/chat-container';
import { Footer } from './components/footer';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <HeaderWithNavigation />
      <div className={styles['app-content']}>
        <SideMenu />
        <ChatContainer />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
