import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useSnackbar} from 'notistack';

import {Form, Formik} from 'formik';

import {Button, DialogActions} from '@mui/material';

import {useAddSkillRequestsMutation} from 'api/skill-requests';
import {formSubmitHandling} from 'utils/forms';

import Input from 'components/Common/Form/Input';
import CustomizedDialogs from 'components/Modals/CustomizedDialogs';
import {CreateSkillSetSchema, initialValues} from 'components/SkillSet/SkillSetModal/skillSetShema';

export default function SkillSetModal({isOpen, onClose, ...rest}) {
  const {role, id} = useSelector(state => state.auth.profile);
  const [addSkillRequests] = useAddSkillRequestsMutation();
  const {enqueueSnackbar} = useSnackbar();

  const onSave = (values, actions) => {
    formSubmitHandling(
      addSkillRequests,
      {...values, role, users_id: id},
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
      type="form"
      isOpen={isOpen}
      onClose={onClose}
      onCancel={onClose}
      onSave={onSave}
      title="Propose new skill"
      text=""
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
              <Button variant="outlined" data-testid="skill-set-modal-cancel-btn" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                data-testid="skill-set-modal-confirm-btn"
                disabled={isSubmitting || !isValid || !dirty}
              >
                Propose
              </Button>
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
