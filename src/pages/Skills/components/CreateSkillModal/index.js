import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Formik, Form} from 'formik';
import {useDispatch} from 'react-redux';
import {useSnackbar} from 'notistack';

import {useFetchGroupsQuery} from 'services/groups';
import {useUpdateSkillMutation, useAddSkillMutation, getSkills} from 'services/skills';
import {useURLParams} from 'hooks/dataGrid';
import {diffFormValues, formSubmitHandling} from 'utils/forms';
import DialogControls from 'components/Modals/DialogControls';
import CustomizedDialogs from 'components/Modals/CustomizedDialogs';
import Input from 'components/Common/Form/Input';
import SelectField from 'components/Common/Form/Select';

import CreateSkillSchema from './createSkillShema';

const CreateSkillModal = ({isOpen, skill, onClose}) => {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();

  const isEdit = skill && skill.id;

  const {clearQueryParams, isAllParamsEmpty, queryParams} = useURLParams();

  const [updateSkill, {isLoading: isUpdateLoading, isSuccess: isUpdateSuccess}] =
    useUpdateSkillMutation();
  const [addSkill, {isLoading: isAddLoading, isSuccess: isAddSuccess}] = useAddSkillMutation();

  const {data: {groups = []} = {}} = useFetchGroupsQuery({});

  const title = isEdit ? 'Edit skill' : 'Create new skill';

  const initialState = isEdit ? {...skill} : {name: '', description: '', groups: []};

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

    if (values.groups && values.groups.length > 0) {
      values.groups.map(value => newValues.push(value.id));
      values.groups = newValues;
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
              name="groups"
              label="Groups"
              options={groups}
              multiple
              errors={errors}
              placeholder="Choose groups"
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
