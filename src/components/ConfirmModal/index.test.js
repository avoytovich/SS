import React from 'react';
import { render, screen } from 'utils/test-utils';
import ConfirmModal from 'components/ConfirmModal';

test('Render confirm modal and check if text displayed', () => {
  render(
    <ConfirmModal
      modalOpen={true}
      bodyContent={{ title: 'title', text: 'text', cancelText: 'No', confirmText: 'Yes' }}
    />
  );
  expect(screen.getByText(/title/i)).toBeInTheDocument();
  expect(screen.getByText(/text/i)).toBeInTheDocument();
  expect(screen.getByText(/No/i)).toBeInTheDocument();
  expect(screen.getByText(/Yes/i)).toBeInTheDocument();
});
