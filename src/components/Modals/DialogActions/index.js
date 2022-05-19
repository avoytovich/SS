import React from 'react';
import PropTypes from 'prop-types';
import {Formik, Form} from 'formik';

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

import Input from '../../Common/Form/Input/Input';
import CustomizedDialogs from '../../Modals/CustomizedDialogs';

import CreateSkillSchema from './createSkillShema';

// import CreateSkillForm from '../CreateSkillForm';

const DialogActions = ({disabledConfirm, onClose, onSubmit}) => (
  <DialogActions>
    <Button variant="outlined" data-testid="confirm-modal-cancel-btn" onClick={onClose}>
      Cancel
    </Button>
    <Button
      type="submit"
      variant="contained"
      data-testid="confirm-modal-confirm-btn"
      disabled={disabledConfirm}
      onClick={onSubmit}
    >
      Save
    </Button>
  </DialogActions>
);

DialogActions.propTypes = {
  disabledConfirm: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

DialogActions.defaultProps = {
  disabledConfirm: false,
  onClose: () => {},
  onSubmit: () => {}
};

export default DialogActions;
