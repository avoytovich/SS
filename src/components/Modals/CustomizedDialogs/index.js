import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import CircularProgress from '@mui/material/CircularProgress';

import {ButtonContained, ButtonOutlined} from '../../Button';

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
  loading,
  withCustomBtns,
  isRemove,
  updating,
  removeText
}) => {
  const classes = useStyles();
  return (
    <Dialog
      fullWidth
      maxWidth={isRemove ? 'xs' : 'sm'}
      open={isOpen}
      onClose={onClose}
      data-testid="dialog-modal-wrap"
    >
      <DialogTitle data-testid="confirm-modal-title" className={classes.title}>
        {title}
      </DialogTitle>
      <DialogContent className={classes.content}>
        {(updating || loading) && (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        )}
        {!loading && (
          <>
            <DialogContentText className={classes.contentDesc} data-testid="confirm-modal-text">
              {text}
            </DialogContentText>
            {children}
          </>
        )}
      </DialogContent>
      {!withCustomBtns && (
        <DialogActions className={classes.actions}>
          <ButtonOutlined data-testid="confirm-modal-cancel-btn" onClick={onClose}>
            {cancelText}
          </ButtonOutlined>
          <ButtonContained
            data-testid="confirm-modal-confirm-btn"
            color={isRemove ? 'error' : 'primary'}
            onClick={handleSubmit}
          >
            {isRemove ? removeText : confirmText}
          </ButtonContained>
        </DialogActions>
      )}
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
  confirmText: PropTypes.string,
  withCustomBtns: PropTypes.bool,
  removeText: PropTypes.string,
  isRemove: PropTypes.bool,
  updating: PropTypes.bool, // saving or edit data
  loading: PropTypes.bool // Loading initial data
};

CustomizedDialogs.defaultProps = {
  isOpen: false,
  onClose: () => {},
  handleSubmit: () => {},
  title: 'Are you sure?',
  text: '',
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  removeText: 'Remove',
  withCustomBtns: false,
  isRemove: false,
  loading: false,
  updating: false
};

export default CustomizedDialogs;
