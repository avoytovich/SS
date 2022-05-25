import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Formik, Form} from 'formik';
import {useSnackbar} from 'notistack';

import {useUpdateSkillMutation, useAddSkillMutation} from 'api/skills';
import {useURLParams} from 'hooks/dataGrid';

import DialogControls from '../../Modals/DialogControls';
import Input from '../../Common/Form/Input/Input';
import CustomizedDialogs from '../../Modals/CustomizedDialogs';

import CreateSkillSchema from './createSkillShema';

const CreateSkillModal = ({isOpen, id, onClose, loading}) => {
  const {clearQueryParams} = useURLParams();
  const {enqueueSnackbar} = useSnackbar();

  const [updateSkill, {isLoading: isUpdateLoading, isSuccess: isUpdateSuccess}] =
    useUpdateSkillMutation();
  const [addSkill, {isLoading: isAddLoading, isSuccess: isAddSuccess}] = useAddSkillMutation();

  const title = id ? 'Edit tag' : 'Create new tag';

  useEffect(() => {
    if (isUpdateSuccess || isAddSuccess || loading) {
      clearQueryParams();
      onClose();
      enqueueSnackbar('Skill have successfully saved');
    }
    return () => {};
  }, [isUpdateSuccess, isAddSuccess]);

  const handleSubmit = params => {
    if (id) {
      updateSkill({id});
    } else {
      addSkill(params);
    }
  };

  return (
    <CustomizedDialogs
      type="form"
      isOpen={isOpen}
      onClose={onClose}
      onCancel={onClose}
      loading={isUpdateLoading || isAddLoading}
      title={title}
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
            <Input name="name" label="Name" placeholder="Type skill name" />
            <DialogControls disabledConfirm={isSubmitting} onClose={onClose} />
          </Form>
        )}
      </Formik>
    </CustomizedDialogs>
  );
};

CreateSkillModal.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

CreateSkillModal.defaultProps = {
  id: '',
  isOpen: false,
  loading: false,
  onClose: () => {},
  onSubmit: () => {}
};

export default CreateSkillModal;
