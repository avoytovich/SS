import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useSnackbar} from 'notistack';
import {Form, Formik} from 'formik';
import {DialogActions} from '@mui/material';

import {useAddSkillRequestsMutation} from 'services/skillRequests';
import {formSubmitHandling} from 'utils/forms';
import Input from 'components/Common/Form/Input';
import CustomizedDialogs from 'components/Modals/CustomizedDialogs';
import {ButtonContained, ButtonOutlined} from 'components/Button';

import {CreateSkillSetSchema, initialValues} from './skillSetShema';

export default function SkillSetModal({isOpen, onClose, ...rest}) {
  const {id} = useSelector(state => state.auth.profile);
  const [addSkillRequests] = useAddSkillRequestsMutation();
  const {enqueueSnackbar} = useSnackbar();

  const onSave = (values, actions) => {
    formSubmitHandling(
      addSkillRequests,
      {...values, users_id: id},
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
      {...rest}
    >
      <Formik
        validateOnBlur={false}
        validateOnChange
        onSubmit={onSave}
        validationSchema={CreateSkillSetSchema}
        initialValues={initialValues}
      >
        {({isSubmitting, isValid, dirty}) => (
          <Form autoComplete="off">
            <Input
              name="name"
              label="Skill Name"
              placeholder="Type skill name"
              data-testid="skill-set-modal-input-name"
              sx={{marginBottom: '16px'}}
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
                disabled={isSubmitting || !isValid || !dirty}
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
