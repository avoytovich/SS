import PropTypes from 'prop-types';
import {Form} from 'formik';
import {DialogActions} from '@mui/material';

import {ButtonContained, ButtonOutlined} from 'components/Button';

import CreateAdminFromContent from './CreateAdminFromContent';

const CreateAdminFrom = ({isSubmitting, dirty, resetForm, errors, onClose}) => {
  const handleClose = () => {
    onClose(resetForm);
  };

  return (
    <Form>
      <CreateAdminFromContent errors={errors} />
      <DialogActions>
        <ButtonOutlined data-testid="admin-modal-cancel-btn" onClick={handleClose}>
          Cancel
        </ButtonOutlined>
        <ButtonContained
          type="submit"
          data-testid="admin-modal-confirm-btn"
          disabled={isSubmitting || !dirty}
        >
          Add
        </ButtonContained>
      </DialogActions>
    </Form>
  );
};

CreateAdminFrom.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  errors: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired
};

export default CreateAdminFrom;
