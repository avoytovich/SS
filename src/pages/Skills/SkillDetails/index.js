import {useParams} from 'react-router-dom';
import {useFormik, withFormik} from 'formik';
import {Grid} from '@mui/material';

import {useFetchSkillRequestQuery} from 'services/skillRequests';
import PageLayout from 'components/Common/Layout/PageLayout';
import Field from 'components/Form/Field';
import SelectField from 'components/Form/Select';

import {useFetchTagsQuery} from '../../../services/tags';
import {ButtonContained} from '../../../components/Button';

import ReviewSkillSchema from './reviewSkillShema';

const SkillDetails = () => {
  const {id} = useParams();
  console.log(id);

  const {data: {tags = []} = {}, isLoading: isLoadingTags} = useFetchTagsQuery({});

  const {
    data: {data: skill = {}} = {},
    isFetching,
    isLoading
  } = useFetchSkillRequestQuery({id: Number(id)});
  console.log(skill, isLoading, isFetching);

  const handleSubmit = values => {
    console.log(JSON.stringify(values, null, 2));
    alert(JSON.stringify(values, null, 2));
  };

  const formik = useFormik({
    initialValues: skill ?? {
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

  console.log(isLoadingTags);

  return (
    <PageLayout
      title={`Review ${skill.name} skill`}
      type="skills-page"
      isLoading={isLoadingTags || isLoading || isFetching}
      extra={
        <>
          <ButtonContained onClick={formik.submitForm}>Save</ButtonContained>
          <ButtonContained>Cancel</ButtonContained>
        </>
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} lg={6}>
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

            <button type="submit">Submit</button>
          </form>
        </Grid>
        <Grid item xs={12} md={5} lg={6}>
          Proposed by
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default withFormik({mapPropsToValues: () => ({name: ''})})(SkillDetails);
