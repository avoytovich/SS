import React from 'react';
import {NavLink as RouterLink} from 'react-router-dom';

import {Button} from '@mui/material';

import PageLayout from 'components/Common/Layout/PageLayout';
import ProfileDetails from 'components/Profile/ProfileDetails';
import SkillList from 'components/Profile/SkillList';
import routes from 'constants/routes';

export default function MyProfile() {
  return (
    <PageLayout
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
    >
      <ProfileDetails />
      <SkillList />
    </PageLayout>
  );
}
