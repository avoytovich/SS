import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useSnackbar} from 'notistack';
import {Form, Formik} from 'formik';

import {useFetchAutocompleteSkillsQuery, useRejectRequestedSkillMutation} from 'services/skills';
import CustomizedDialogs from 'components/Modals/CustomizedDialogs';
import Input from 'components/Common/Form/Input';
import SelectField from 'components/Common/Form/Select';
import DialogControls from 'components/Modals/DialogControls';
import {formSubmitHandling} from 'utils/forms';
import {REJECT_REASONS} from 'constants/common';

import RejectSkillSchema from './rejectSkillShema';
import {
  getResetFormField,
  isDuplicatedReason,
  isOtherReason,
  initialState,
  getSubmitValues
} from './utils';

// FIX: problem with call this modal

const RejectSkillModal = ({isOpen, skill, onClose}) => {
  const {enqueueSnackbar} = useSnackbar();
  const {profile} = useSelector(state => state.auth);
  const {data: skills = []} = useFetchAutocompleteSkillsQuery();
  const [rejectRequestedSkill, {isLoading}] = useRejectRequestedSkillMutation();
  const title = `Reject “${skill.name}”?`;

  const handleSubmit = (params, actions) => {
    const {rejectReason, duplicated, details} = params;

    formSubmitHandling(
      rejectRequestedSkill,
      {...getSubmitValues(skill.id, profile.id, rejectReason, duplicated, details)},
      actions,
      () => {
        onClose();
        enqueueSnackbar('Skill request have successfully rejected');
      },
      () => {
        enqueueSnackbar('Skill request have not rejected, please check form fields', {
          variant: 'error'
        });
      }
    );
  };

  const handleClose = (resetForm, setSubmitting) => {
    resetForm();
    setSubmitting(false);
    onClose();
  };

  const handleChangeReason = (values, setFieldValue) => {
    const {name, value} = getResetFormField(values.id);
    setFieldValue(name, value);
  };

  return (
    <CustomizedDialogs
      type="form"
      isOpen={isOpen}
      onClose={onClose}
      onCancel={onClose}
      title={title}
      text="You can not undo this action"
      data-testid="reject-skill-modal"
      withCustomBtns
      updating={isLoading}
    >
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSubmit}
        validationSchema={RejectSkillSchema}
        initialValues={initialState}
        enableReinitialize
      >
        {({
          isSubmitting,
          dirty,
          resetForm,
          setSubmitting,
          setFieldValue,
          errors,
          values: {rejectReason}
        }) => (
          <Form autoComplete="off">
            <SelectField
              name="rejectReason"
              label="Rejection reason"
              options={REJECT_REASONS}
              onChange={(e, values) => handleChangeReason(values, setFieldValue)}
              errors={errors}
              placeholder="Choose reason"
            />
            {isDuplicatedReason(rejectReason?.id) && (
              <SelectField
                name="duplicated"
                label="Duplicated skill name"
                options={skills}
                errors={errors}
                placeholder="Choose skill"
              />
            )}
            {isOtherReason(rejectReason?.id) && (
              <Input
                name="details"
                label="Details"
                multiline
                rows={3}
                placeholder="Type reject detail"
              />
            )}
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

RejectSkillModal.propTypes = {
  skill: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

RejectSkillModal.defaultProps = {
  isOpen: false,
  skill: {},
  onClose: () => {}
};

export default RejectSkillModal;
