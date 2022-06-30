import React from 'react';
import {NavLink as RouterLink} from 'react-router-dom';

import {Button} from '@mui/material';
import {ErrorBoundary} from 'react-error-boundary';

import {PagePanel} from 'components/PagePanel';
import ErrorFallback from 'components/ErrorFallback';
import ProfileDetails from 'components/Profile/ProfileDetails';
import SkillList from 'components/Profile/SkillList';
import PageHeader from 'components/Common/Layout/PageHeader';
import routes from 'constants/routes';

export default function MyProfile() {
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
            component={RouterLink}
            to={routes.skillSet}
            exact={true}
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
