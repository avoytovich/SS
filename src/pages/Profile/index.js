import React from 'react';
import {NavLink as RouterLink} from 'react-router-dom';

import PageLayout from 'components/Common/Layout/PageLayout';
import {ButtonContained} from 'components/Button';
import routes from 'constants/routes';

import ProfileDetails from './components/ProfileDetails';
import SkillList from './components/SkillList';

export default function MyProfile() {
  return (
    <PageLayout
      title="My profile"
      // TODO Refactor to avoid passing an array, as it forces setting up "key" properties that look redundant in this use case
      extra={[
        <ButtonContained
          key="profile-page-skillset-btn"
          data-testid="profile-page-skillset-btn"
          component={RouterLink}
          to={routes.skillSet}
          exact={true}
        >
          Update skillset
        </ButtonContained>
      ]}
    >
      <ProfileDetails />
      <SkillList />
    </PageLayout>
  );
}
