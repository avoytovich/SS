import React from 'react';
import PropTypes from 'prop-types';
import {Formik, Form} from 'formik';
import FormikField from 'components/Common/FormikField';
import CustomizedDialogs from '../../Modals/CustomizedDialogs';

// import CreateSkillForm from '../CreateSkillForm';

const CreateSkillModal = ({isOpen, onClose, loading, onSubmit}) => (
  <CustomizedDialogs
    type="form"
    isOpen={isOpen}
    onClose={onClose}
    onCancel={onClose}
    onSave={onSubmit}
    loading={loading}
    title="Create new skill"
    text="Input name of the skill and choose tag(s)"
    data-testid="create-skill-modal"
  >
    <Formik onSubmit={onSubmit} initialValues={{name: ''}} enableReinitialize>
      {() => (
        <Form>
          <FormikField type="text" name="name" placeholder="Type skill name" />
        </Form>
      )}
    </Formik>
  </CustomizedDialogs>
);

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
