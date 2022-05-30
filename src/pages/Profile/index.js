import React from 'react';
import {useSelector} from 'react-redux';

import {Box, Button} from '@mui/material';
import {ErrorBoundary} from 'react-error-boundary';

import {PagePanel} from 'components/PagePanel';
import UserAvatar from 'components/Common/UserAvatar';
import ErrorFallback from 'components/ErrorFallback';
import ProfileDetails from 'components/Profile/ProfileDetails';
import SkillList from 'components/Profile/SkillList';

export default function MyProfile() {
  const {
    first_name: firstName,
    last_name: lastName,
    full_name: fullName,
    photo_url: photo,
    id,
    competency,
    specialization,
    level
  } = useSelector(state => state.auth.profile);
  return (
    <>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <UserAvatar firstName={firstName} lastName={lastName} fullName={fullName} photo={photo} />
        <Button
          key="tag-page-create-btn"
          sx={{borderRadius: '40px'}}
          variant="contained"
          data-testid="tag-page-create-btn"
          onClick={() => {}}
        >
          Update skills
        </Button>
      </Box>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PagePanel>
          <ProfileDetails competency={competency} specialization={specialization} level={level} />
          <SkillList id={id} />
        </PagePanel>
      </ErrorBoundary>
    </>
  );
}
