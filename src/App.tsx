import React from 'react';
import logo from './logo.svg';
import styles from './App.module.less';
import { JustAButton } from './components/just-a-button';

function App() {
  return (
    <div className={styles.App}>
      <header className={styles['App-header']}>
        <img src={logo} className={styles['App-logo']} alt="logo" />
        <JustAButton />
      </header>
      <main>Main starts here...</main>
    </div>
  );
}

export default App;
