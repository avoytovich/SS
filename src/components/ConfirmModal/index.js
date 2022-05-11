import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

function ConfirmModal({modalOpen, toggle, bodyContent, handleSubmit}) {
  return (
    <Dialog open={modalOpen} onClose={toggle}>
      <DialogTitle data-testid="confirm-modal-title">{bodyContent?.title}</DialogTitle>
      <DialogContent>
        <DialogContentText data-testid="confirm-modal-text">{bodyContent?.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button data-testid="confirm-modal-cancel-btn" onClick={toggle}>
          {bodyContent?.cancelText}
        </Button>
        <Button data-testid="confirm-modal-confirm-btn" onClick={handleSubmit}>
          {bodyContent?.confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmModal;
ConfirmModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  bodyContent: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string
  })
};
ConfirmModal.defaultProps = {
  modalOpen: false,
  toggle: () => {},
  handleSubmit: () => {},
  bodyContent: {
    title: 'Are you sure?',
    text: 'Do some action',
    cancelText: 'Cancel',
    confirmText: 'Confirm'
  }
};
