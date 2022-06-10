import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

const DialogControls = ({disabledConfirm, onClose, onSubmit}) => (
  <DialogActions data-testid="dialog-actions-btn">
    <Button variant="outlined" data-testid="dialog-actions-cancel-btn" onClick={onClose}>
      Cancel
    </Button>
    <Button
      type="submit"
      variant="contained"
      data-testid="dialog-actions-confirm-btn"
      disabled={disabledConfirm}
      onClick={onSubmit}
    >
      Save
    </Button>
  </DialogActions>
);

DialogControls.propTypes = {
  disabledConfirm: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

DialogControls.defaultProps = {
  disabledConfirm: false,
  onClose: () => {},
  onSubmit: () => {}
};

export default DialogControls;
