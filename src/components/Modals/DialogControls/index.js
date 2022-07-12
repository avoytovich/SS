import React from 'react';
import PropTypes from 'prop-types';
import DialogActions from '@mui/material/DialogActions';

import {ButtonContained, ButtonOutlined} from '../../Button';

const DialogControls = ({disabledConfirm, onClose, onSubmit}) => (
  <DialogActions data-testid="dialog-actions-btn">
    <ButtonOutlined data-testid="dialog-actions-cancel-btn" onClick={onClose}>
      Cancel
    </ButtonOutlined>
    <ButtonContained
      type="submit"
      data-testid="dialog-actions-confirm-btn"
      disabled={disabledConfirm}
      onClick={onSubmit}
    >
      Save
    </ButtonContained>
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
