import React from 'react';
import {render, screen} from 'utils/test-utils';
import ConfirmModal from 'components/ConfirmModal';

test('Render confirm modal and check if text displayed', () => {
  render(
    <ConfirmModal
      modalOpen={true}
      bodyContent={{title: 'title', text: 'text', cancelText: 'No', confirmText: 'Yes'}}
    />
  );
  expect(screen.getByTestId('confirm-modal-title')).toHaveTextContent('title');
  expect(screen.getByTestId('confirm-modal-text')).toHaveTextContent('text');
  expect(screen.getByTestId('confirm-modal-cancel-btn')).toHaveTextContent('No');
  expect(screen.getByTestId('confirm-modal-confirm-btn')).toHaveTextContent('Yes');
});
