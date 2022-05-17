import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import CircularProgress from '@mui/material/CircularProgress';

import useStyles from './styles';

const CustomizedDialogs = ({
  isOpen,
  onClose,
  title,
  text,
  children,
  cancelText,
  confirmText,
  handleSubmit,
  loading
}) => {
  const classes = useStyles();
  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={onClose}>
      <DialogTitle data-testid="confirm-modal-title" className={classes.title}>
        {title}
      </DialogTitle>
      {loading ? (
        <DialogContent className={classes.loader}>
          <CircularProgress />
        </DialogContent>
      ) : (
        <DialogContent className={classes.content}>
          <DialogContentText className={classes.contentDesc} data-testid="confirm-modal-text">
            {text}
          </DialogContentText>
          {children}
        </DialogContent>
      )}
      <DialogActions className={classes.actions}>
        <Button variant="outlined" data-testid="confirm-modal-cancel-btn" onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant="contained" data-testid="confirm-modal-confirm-btn" onClick={handleSubmit}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomizedDialogs.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string
};

CustomizedDialogs.defaultProps = {
  isOpen: false,
  onClose: () => {},
  handleSubmit: () => {},
  title: 'Are you sure?',
  text: 'Do some action',
  cancelText: 'Cancel',
  confirmText: 'Confirm'
};

export default CustomizedDialogs;
