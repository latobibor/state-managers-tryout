import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

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
    const { getByText } = render(<App />);
    const linkElement = getByText(/State Management Try Outs/i);
    expect(linkElement).toBeInTheDocument();
  });
});
