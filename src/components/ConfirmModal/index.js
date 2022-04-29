import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmModal({ modalOpen, toggle, bodyContent, handleSubmit }) {
  return (
    <Dialog open={modalOpen} onClose={toggle}>
      <DialogTitle>{bodyContent.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{bodyContent.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle}>{bodyContent.cancelText}</Button>
        <Button onClick={handleSubmit}>{bodyContent.confirmText}</Button>
      </DialogActions>
    </Dialog>
  );
}
