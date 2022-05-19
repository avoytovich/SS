import React from 'react';
import PropTypes from 'prop-types';
import {Formik, Form} from 'formik';

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

import Input from '../../Common/Form/Input/Input';
import CustomizedDialogs from '../../Modals/CustomizedDialogs';

import CreateSkillSchema from './createSkillShema';

// import CreateSkillForm from '../CreateSkillForm';

const CreateSkillModal = ({isOpen, onClose, loading}) => {
  const handleSubmit = () => {
    console.log('submit');
  };
  return (
    <CustomizedDialogs
      type="form"
      isOpen={isOpen}
      onClose={onClose}
      onCancel={onClose}
      onSave={handleSubmit}
      loading={loading}
      title="Create new skill"
      text="Input name of the skill and choose tag(s)"
      data-testid="create-skill-modal"
      withCustomBtns
    >
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSubmit}
        validationSchema={CreateSkillSchema}
        initialValues={{name: ''}}
        enableReinitialize
      >
        {({isSubmitting}) => (
          <Form autoComplete="off">
            {/* {isSubmitting && ( */}
            {/*  <LoadingProgress coverPage title="Please wait while saving is completed" /> */}
            {/* )} */}

            <Input name="name" label="Name" placeholder="Type skill name" />
            <DialogActions>
              <Button variant="outlined" data-testid="confirm-modal-cancel-btn" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                data-testid="confirm-modal-confirm-btn"
                disabled={isSubmitting}
              >
                Save
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </CustomizedDialogs>
  );
};

CreateSkillModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

CreateSkillModal.defaultProps = {
  isOpen: false,
  loading: false,
  onClose: () => {},
  onSubmit: () => {}
};

export default CreateSkillModal;
