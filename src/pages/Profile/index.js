import React from 'react';

import {Button} from '@mui/material';
import {ErrorBoundary} from 'react-error-boundary';

import {PagePanel} from 'components/PagePanel';
import ErrorFallback from 'components/ErrorFallback';
import ProfileDetails from 'components/Profile/ProfileDetails';
import SkillList from 'components/Profile/SkillList';
import PageHeader from 'components/Common/Layout/PageHeader';

export default function MyProfile() {
  const onUpdateSkillset = () => {};

  return (
    <>
      <PageHeader
        title="My profile"
        extra={[
          <Button
            key="profile-page-skillset-btn"
            sx={{borderRadius: '40px'}}
            variant="contained"
            data-testid="profile-page-skillset-btn"
            onClick={onUpdateSkillset}
          >
            Update skillset
          </Button>
        ]}
      />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PagePanel>
          <ProfileDetails />
          <SkillList />
        </PagePanel>
      </ErrorBoundary>
    </>
  );
}
