import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Formik, Form} from 'formik';
import {useFetchTagsQuery} from 'services/tags';
import {useDispatch} from 'react-redux';
import {useUpdateSkillMutation, useAddSkillMutation, getSkills} from 'services/skills';
import {useSnackbar} from 'notistack';
import {useURLParams} from 'hooks/dataGrid';
import {diffFormValues, formSubmitHandling} from 'utils/forms';

import DialogControls from '../../Modals/DialogControls';
import Input from '../../Common/Form/Input';
import SelectField from '../../Common/Form/Select';
import CustomizedDialogs from '../../Modals/CustomizedDialogs';

import CreateSkillSchema from './createSkillShema';

const CreateSkillModal = ({isOpen, skill, onClose}) => {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();

  const isEdit = skill && skill.id;

  const {clearQueryParams, isAllParamsEmpty, queryParams} = useURLParams();

  const [updateSkill, {isLoading: isUpdateLoading, isSuccess: isUpdateSuccess}] =
    useUpdateSkillMutation();
  const [addSkill, {isLoading: isAddLoading, isSuccess: isAddSuccess}] = useAddSkillMutation();

  const {data: {tags = []} = {}} = useFetchTagsQuery({});

  const title = isEdit ? 'Edit skill' : 'Create new skill';

  const initialState = isEdit ? {...skill} : {name: '', description: '', tags: []};

  useEffect(() => {
    if (isUpdateSuccess || isAddSuccess) {
      if (isAllParamsEmpty() || queryParams.get('page') === '1') {
        dispatch(getSkills);
      }
      clearQueryParams();
      onClose();
    }
    return () => {};
  }, [isUpdateSuccess, isAddSuccess]);

  const handleClose = (resetForm, setSubmitting) => {
    resetForm();
    setSubmitting(false);
    if (onClose) onClose();
  };

  const handleSubmit = (params, actions) => {
    const newValues = [];
    const values = diffFormValues(initialState, {...params});

    if (values.tags && values.tags.length > 0) {
      values.tags.map(value => newValues.push(value.id));
      values.tags = newValues;
    }

    if (isEdit) {
      values.id = skill.id;
    }

    formSubmitHandling(
      isEdit ? updateSkill : addSkill,
      {...values},
      actions,
      () => {
        enqueueSnackbar('Skill have successfully saved');
      },
      () => {
        enqueueSnackbar('Skill have not saved, please check form fields', {variant: 'error'});
      }
    );
  };

  return (
    <CustomizedDialogs
      type="form"
      isOpen={isOpen}
      onClose={onClose}
      onCancel={onClose}
      title={title}
      text="Input name of the skill and choose tag(s)"
      data-testid="create-skill-modal"
      withCustomBtns
      updating={isUpdateLoading || isAddLoading}
    >
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSubmit}
        validationSchema={CreateSkillSchema}
        initialValues={initialState}
        enableReinitialize
      >
        {({isSubmitting, dirty, resetForm, setSubmitting, errors}) => (
          <Form autoComplete="off">
            <Input name="name" label="Name" placeholder="Type skill name" />
            <SelectField
              name="tags"
              label="Tags"
              options={tags}
              multiple
              errors={errors}
              placeholder="Choose tags"
            />
            <Input
              name="description"
              label="Description"
              multiline
              rows={3}
              rowsMax={15}
              placeholder="Type skill description"
            />
            <DialogControls
              disabledConfirm={isSubmitting || !dirty}
              onClose={() => {
                handleClose(resetForm, setSubmitting);
              }}
            />
          </Form>
        )}
      </Formik>
    </CustomizedDialogs>
  );
};

CreateSkillModal.propTypes = {
  skill: PropTypes.object,
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
