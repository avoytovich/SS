import React from 'react';

import {fireEvent, render, screen} from 'containers/TestProviderWrapper';
import NotFound from 'pages/NotFound';

const mockGoBack = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    goBack: mockGoBack
  })
}));

describe('Not Found Page', () => {
  it('should render page', async () => {
    render(<NotFound />);
    expect(screen.getByTestId('not-found-content')).toBeVisible();
    expect(screen.getByText('Not Found')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('back-btn'));
    expect(mockGoBack).toBeCalled();
  });
});
