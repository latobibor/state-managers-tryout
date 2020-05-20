import React from 'react';
import ReactDOM from 'react-dom';
import './shared-styles/variables.module.less';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as OvermindProvider } from 'overmind-react';
import { store } from './redux/store';
import { overmind } from './overmind';

ReactDOM.render(
  <ReduxProvider store={store}>
    <OvermindProvider value={overmind}>
      <App />
    </OvermindProvider>
  </ReduxProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
