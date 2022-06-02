import React from 'react';
import {act, fireEvent, render, screen} from 'utils/test-utils';
import Tags from 'pages/Tags';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  }),
  useLocation: () => ({
    pathname: '/tags'
  })
}));

describe('Tags', () => {
  it('should render tags page', async () => {
    render(<Tags />);
    expect(screen.getByTestId('tag-page-create-btn')).toBeVisible();
    fireEvent.click(screen.getByTestId('tag-page-create-btn'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeVisible();
    expect(screen.getByTestId('confirm-modal-title')).toHaveTextContent('Create new tag');
    expect(screen.getByTestId('tag-modal-confirm-btn')).toBeDisabled();

    await act(async () => {
      fireEvent.change(screen.getByRole('textbox'), {target: {value: 'tag'}});
    });

    expect(screen.getByRole('textbox')).toHaveValue('tag');

    expect(screen.getByTestId('tag-modal-confirm-btn')).not.toBeDisabled();
    await act(async () => {
      fireEvent.click(screen.getByTestId('tag-modal-confirm-btn'));
    });
  });
  it('should render open create tag modal', async () => {
    render(<Tags />);
    expect(screen.getByTestId('tag-page-create-btn')).toBeVisible();
    fireEvent.click(screen.getByTestId('tag-page-create-btn'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeVisible();
    expect(screen.getByTestId('confirm-modal-title')).toHaveTextContent('Create new tag');
    expect(screen.getByTestId('tag-modal-confirm-btn')).toBeDisabled();
    fireEvent.click(screen.getByTestId('tag-modal-cancel-btn'));
  });
});
