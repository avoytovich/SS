import {useHistory, useParams} from 'react-router-dom';
import {useFormik} from 'formik';
import {Grid} from '@mui/material';
import {useSnackbar} from 'notistack';

import {useFetchSkillRequestQuery, useApproveRequestedSkillMutation} from 'services/skillRequests';
import PageLayout from 'components/Common/Layout/PageLayout';
import Field from 'components/Form/Field';
import SelectField from 'components/Form/Select';
import {formSubmitHandling} from 'utils/forms';
import {useFetchGroupsQuery} from 'services/groups';
import {ButtonContained} from 'components/Button';
import routes from 'constants/routes';

import RejectSkillModal from '../../../components/RejectSkillModal';
import RejectedDetailItem from '../RejectedSkillDetails/RejectedDetailItem';
import useModal from '../../../../../hooks/useModal';

import ReviewSkillSchema from './reviewSkillShema';

// TODO: Rewrite it

const newSkillRequest = () => {
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();
  const history = useHistory();
  const rejectModal = useModal();

  const {data: {groups = []} = {}, isLoading: isLoadingTags} = useFetchGroupsQuery({});

  const {
    data: {data: skill = {}} = {},
    isFetching,
    isLoading
  } = useFetchSkillRequestQuery({id: Number(id)});

  const [approveRequestedSkill] = useApproveRequestedSkillMutation();

  const handleModalReject = () => {
    rejectModal.toggle();
  };

  const handleBack = () => {
    history.push(routes.skills.list);
  };

  const handleSubmit = (params, actions) => {
    const newValues = [];

    if (params.groups && params.groups.length > 0) {
      params.groups.map(value => newValues.push(value.id));
    }

    params.groups = newValues;

    formSubmitHandling(
      approveRequestedSkill,
      {
        id: skill.id,
        ...params
      },
      actions,
      () => {
        enqueueSnackbar(`${skill.name} have successfully approved`);
        handleBack();
      },
      () => {
        enqueueSnackbar(`${skill.name} have not approved, please check form fields`, {
          variant: 'error'
        });
      }
    );
  };

  const formik = useFormik({
    initialValues: skill
      ? {
          name: skill.name,
          description: skill.description,
          comment: skill.comment,
          groups: skill.groups
        }
      : {
          name: '',
          description: '',
          groups: []
        },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: ReviewSkillSchema,
    enableReinitialize: true,
    onSubmit: handleSubmit
  });

  const handleApprove = () => {
    formik.submitForm();
  };

  return (
    <PageLayout
      title={`Review ${skill.name} skill`}
      isLoading={isLoadingTags || isLoading || isFetching}
      isBack
      extra={
        <>
          <ButtonContained onClick={handleModalReject} color="error">
            Reject
          </ButtonContained>
          <ButtonContained onClick={handleApprove}>Approve</ButtonContained>
        </>
      }
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={6}>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Field name="name" label="Skill name" formik={formik} placeholder="Type skill name" />

            <SelectField
              name="groups"
              options={groups}
              defaultValue={formik.values.groups}
              multiple
              placeholder="Choose groups"
              label="Groups"
              formik={formik}
            />

            <Field
              name="description"
              multiline
              rows={3}
              rowsMax={15}
              label="Description"
              formik={formik}
              placeholder="Type skill name"
            />
          </form>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          {/* // TODO: Rewrite RejectedDetailItem and use it in both components  */}
          <RejectedDetailItem title="Proposed by" value={skill.user_full_name} />
          <RejectedDetailItem title="Comment" value={skill.comment} />
        </Grid>
      </Grid>
      {rejectModal.isOpen && skill && (
        <RejectSkillModal isOpen={rejectModal.isOpen} skill={skill} onClose={handleModalReject} />
      )}
    </PageLayout>
  );
};

export default newSkillRequest;
