import {render, screen} from 'containers/TestProviderWrapper';
import React from 'react';
import App from './App';

test('render app without crash', () => {
  render(<App />);

  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});
