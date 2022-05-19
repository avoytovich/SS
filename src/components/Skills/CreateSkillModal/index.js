import React from 'react';
import PropTypes from 'prop-types';
import {Formik, Form} from 'formik';

import DialogControls from '../../Modals/DialogControls';

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
            <DialogControls
              disabledConfirm={isSubmitting}
              onSubmit={handleSubmit}
              onClose={onClose}
            />
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
