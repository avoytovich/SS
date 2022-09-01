import {useHistory, useParams} from 'react-router-dom';
import {useFormik} from 'formik';
import {Grid} from '@mui/material';
import {useSnackbar} from 'notistack';

import {useFetchSkillRequestQuery, useApproveSkillRequestsMutation} from 'services/skillRequests';
import PageLayout from 'components/Common/Layout/PageLayout';
import Field from 'components/Form/Field';
import SelectField from 'components/Form/Select';
import {formSubmitHandling} from 'utils/forms';
import {useFetchTagsQuery} from 'services/tags';
import {ButtonContained, ButtonOutlined} from 'components/Button';
import routes from 'constants/routes';

import RejectedDetailItem from '../RejectedSkillDetails/RejectedDetailItem';

import ReviewSkillSchema from './reviewSkillShema';

const newSkillRequest = () => {
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();
  const history = useHistory();

  const {data: {tags = []} = {}, isLoading: isLoadingTags} = useFetchTagsQuery({});

  const {
    data: {data: skill = {}} = {},
    isFetching,
    isLoading
  } = useFetchSkillRequestQuery({id: Number(id)});

  const [approveSkillRequest] = useApproveSkillRequestsMutation();

  const handleBack = () => {
    history.push(routes.skills.list);
  };

  const handleSubmit = (params, actions) => {
    const newValues = [];

    if (params.tags && params.tags.length > 0) {
      params.tags.map(value => newValues.push(value.id));
    }

    params.tags = newValues;

    formSubmitHandling(
      approveSkillRequest,
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
          tags: skill.tags
        }
      : {
          name: '',
          description: '',
          tags: []
        },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: ReviewSkillSchema,
    enableReinitialize: true,
    onSubmit: handleSubmit
  });

  return (
    <PageLayout
      title={`Review ${skill.name} skill`}
      isLoading={isLoadingTags || isLoading || isFetching}
      extra={
        <>
          <ButtonContained onClick={formik.submitForm}>Save</ButtonContained>
          <ButtonOutlined onClick={handleBack}>Cancel</ButtonOutlined>
        </>
      }
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={6}>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Field name="name" label="Skill name" formik={formik} placeholder="Type skill name" />

            <SelectField
              name="tags"
              options={tags}
              defaultValue={formik.values.tags}
              multiple
              errors={formik.errors.tags}
              placeholder="Choose tags"
              label="Tags"
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
          <RejectedDetailItem title="Proposed by" value={skill.user_full_name} />
          <RejectedDetailItem title="Comment" value={skill.comment} />
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default newSkillRequest;
