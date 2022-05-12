import React from 'react';
import PropTypes from 'prop-types';
import {Formik, Form} from 'formik';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormikField from 'components/Common/FormikField';
// import CreateSkillForm from '../CreateSkillForm';

const CreateSkillModal = ({isOpen, onClose, onSubmit}) => (
  <Dialog open={isOpen} onClose={onClose}>
    <DialogTitle data-testid="confirm-modal-title">Create Skill</DialogTitle>
    <DialogContent>
      <Formik onSubmit={onSubmit} initialValues={{name: ''}}>
        {() => (
          <Form>
            <FormikField type="text" name="name" placeholder="Type skill name" />
          </Form>
        )}
      </Formik>
    </DialogContent>
  </Dialog>
);

CreateSkillModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

CreateSkillModal.defaultProps = {
  isOpen: false,
  onClose: () => {},
  onSubmit: () => {}
};

export default CreateSkillModal;
