import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useSnackbar} from 'notistack';
import {Form, Formik} from 'formik';
import {DialogActions} from '@mui/material';

import {useAddSkillRequestsMutation} from 'services/skillRequests';
import {useFetchTagsQuery} from 'services/tags';
import {formSubmitHandling} from 'utils/forms';
import Input from 'components/Common/Form/Input';
import CustomizedDialogs from 'components/Modals/CustomizedDialogs';
import {ButtonContained, ButtonOutlined} from 'components/Button';
import SelectField from 'components/Common/Form/Select';

import {CreateSkillSetSchema, initialValues} from './skillSetShema';

export default function SkillSetModal({isOpen, onClose, ...rest}) {
  const {id} = useSelector(state => state.auth.profile);
  const [addSkillRequests, {isLoading}] = useAddSkillRequestsMutation();
  const {enqueueSnackbar} = useSnackbar();
  const {data: {tags = []} = {}} = useFetchTagsQuery({});

  const onSave = (values, actions) => {
    formSubmitHandling(
      addSkillRequests,
      {...values, tags: values.tags.map(value => value.id), users_id: id},
      actions,
      () => {
        onClose();
        enqueueSnackbar('Skill have successfully saved');
      },
      () => {
        enqueueSnackbar('Skill have not saved, please check form fields', {variant: 'error'});
      }
    );
  };

  return (
    <CustomizedDialogs
      isOpen={isOpen}
      onClose={onClose}
      onCancel={onClose}
      onSave={onSave}
      title="Propose new skill"
      withCustomBtns
      updating={isLoading}
      {...rest}
    >
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={onSave}
        validationSchema={CreateSkillSetSchema}
        initialValues={initialValues}
      >
        {({isSubmitting, dirty, errors}) => (
          <Form autoComplete="off">
            <Input
              name="name"
              label="Skill Name"
              placeholder="Type skill name"
              data-testid="skill-set-modal-input-name"
              sx={{marginBottom: '16px'}}
            />
            <SelectField
              name="tags"
              label="Tags"
              options={tags}
              multiple
              placeholder="Choose tags"
              errors={errors}
            />
            <Input
              name="description"
              label="Description"
              placeholder="Type description"
              sx={{marginBottom: '16px'}}
            />
            <Input
              name="comment"
              label="Comment"
              placeholder="Type comment"
              sx={{marginBottom: '16px'}}
            />
            <DialogActions>
              <ButtonOutlined data-testid="skill-set-modal-cancel-btn" onClick={onClose}>
                Cancel
              </ButtonOutlined>
              <ButtonContained
                type="submit"
                data-testid="skill-set-modal-confirm-btn"
                disabled={isSubmitting || !dirty}
              >
                Propose
              </ButtonContained>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </CustomizedDialogs>
  );
}

SkillSetModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

SkillSetModal.defaultProps = {
  isOpen: false,
  onClose: () => {}
};
