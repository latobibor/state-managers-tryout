import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';

describe('App tests', () => {
  beforeAll(() => {
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      };
  });

  test('renders App without crashing', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const linkElement = getByText(/State Management Try Outs/i);
    expect(linkElement).toBeInTheDocument();
  });
});
