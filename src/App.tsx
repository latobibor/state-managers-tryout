import React from 'react';
import styles from './App.module.less';
import { HeaderWithNavigation } from './components/header-components/header';
import { ChatContainerRedux } from './components/chat-area/chat-container.redux';
import { Footer } from './components/footer';
import { BrowserRouter } from 'react-router-dom';
import { StateManagerSwitcher } from './common/state-manager-switcher';
import { ChatContainerOvermind } from './components/chat-area/chat-container.overmind';
import { SideMenuRedux } from './components/sidebar-components/side-menu.redux';
import { SideMenuOvermind } from './components/sidebar-components/side-menu.overmind';

function App() {
  return (
    <BrowserRouter>
      <HeaderWithNavigation />
      <div className={styles['app-content']}>
        <StateManagerSwitcher reduxComponent={<SideMenuRedux />} overmindComponent={<SideMenuOvermind />} />
        <StateManagerSwitcher reduxComponent={<ChatContainerRedux />} overmindComponent={<ChatContainerOvermind />} />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
