import {useParams} from 'react-router-dom';
import {Grid} from '@mui/material';

import {formatDate} from 'utils/helpers';
import {useFetchSkillRequestQuery} from 'services/skillRequests';
import {REJECT_REASONS} from 'constants/common';
import PageLayout from 'components/Common/Layout/PageLayout';

import RejectedDetailItem from './RejectedDetailItem';

const RejectedSkillDetails = () => {
  const {id} = useParams();
  const {
    data: {data: skill = {}} = {},
    isFetching,
    isLoading
  } = useFetchSkillRequestQuery({id: Number(id)});

  const rejectedReason =
    skill.reject_reason === REJECT_REASONS[0].id
      ? `This skill is duplicated by ${skill.duplicated_skill_name}`
      : skill.reject_reason;

  return (
    <PageLayout
      title={`Rejected ${skill.name} skill`}
      type="reject-skills-page"
      isLoading={isLoading || isFetching}
    >
      <Grid container spacing={2}>
        <RejectedDetailItem title="Skill name" value={skill.name} lg={6} />
        <RejectedDetailItem title="Proposed by" value={skill.user_full_name} lg={3} />
        <RejectedDetailItem title="Rejected by" value={skill.reviewer_full_name} lg={3} />

        <RejectedDetailItem title="Tags" value={skill.tags} isValueList lg={6} />
        <RejectedDetailItem title="Proposed at" value={formatDate(skill.created_at)} lg={3} />
        <RejectedDetailItem title="Rejected at" value={formatDate(skill.updated_at)} lg={3} />

        <RejectedDetailItem title="Description" value={skill.description} lg={6} />
        <RejectedDetailItem title="Comment" value={skill.comment} lg={3} />
        <RejectedDetailItem title="Rejection reason" value={rejectedReason} lg={3} />
      </Grid>
    </PageLayout>
  );
};

export default RejectedSkillDetails;
