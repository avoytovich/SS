import React from 'react';
import {fireEvent, render, screen} from 'utils/test-utils';
import AccessDenied from 'pages/AccessDenied';

const mockGoBack = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    goBack: mockGoBack
  })
}));

describe('Access Denied Page', () => {
  it('should render page', async () => {
    render(<AccessDenied />);
    expect(screen.getByTestId('access-denied-content')).toBeVisible();
    expect(screen.getByText('Access denied')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('back-btn'));
    expect(mockGoBack).toBeCalled();
  });
});
