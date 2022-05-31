import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Formik, Form} from 'formik';
import {useSnackbar} from 'notistack';
import {useFetchTagsQuery} from 'api/tags';
import {useDispatch} from 'react-redux';
import {useUpdateSkillMutation, useAddSkillMutation, getSkills} from 'api/skills';

import {useURLParams} from 'hooks/dataGrid';

import DialogControls from '../../Modals/DialogControls';
import Input from '../../Common/Form/Input';
import SelectField from '../../Common/Form/Select';
import CustomizedDialogs from '../../Modals/CustomizedDialogs';

import CreateSkillSchema from './createSkillShema';

const CreateSkillModal = ({isOpen, skill, onClose, loading}) => {
  const dispatch = useDispatch();
  const {clearQueryParams, isAllParamsEmpty, queryParams} = useURLParams();

  const {enqueueSnackbar} = useSnackbar();

  const [updateSkill, {isLoading: isUpdateLoading, isSuccess: isUpdateSuccess}] =
    useUpdateSkillMutation();
  const [addSkill, {isLoading: isAddLoading, isSuccess: isAddSuccess}] = useAddSkillMutation();

  const {data: {tags = []} = {}} = useFetchTagsQuery({});

  const title = skill.id ? 'Edit skill' : 'Create new skill';

  useEffect(() => {
    if (isUpdateSuccess || isAddSuccess || loading) {
      if (isAllParamsEmpty() || queryParams.get('page') === '1') {
        dispatch(getSkills);
      }
      clearQueryParams();
      onClose();
      enqueueSnackbar('Skill have successfully saved');
    }
    return () => {};
  }, [isUpdateSuccess, isAddSuccess]);

  const handleSubmit = params => {
    const newValues = [];
    params.tags.map(value => newValues.push(value.id));

    if (skill.id) {
      updateSkill({
        id: skill.id,
        name: params.name,
        description: params.desctiption,
        tags: newValues
      });
    } else {
      addSkill({name: params.name, description: params.desctiption, tags: newValues});
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
        initialValues={skill.id ? {...skill} : {name: ''}}
        enableReinitialize
      >
        {({isSubmitting}) => (
          <Form autoComplete="off">
            <Input name="name" label="Name" placeholder="Type skill name" />
            <SelectField
              name="tags"
              label="Tags"
              options={tags}
              multiple
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
            <DialogControls disabledConfirm={isSubmitting} onClose={onClose} />
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
