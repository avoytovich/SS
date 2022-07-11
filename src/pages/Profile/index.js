import React from 'react';
import {NavLink as RouterLink} from 'react-router-dom';

import {ButtonContained} from 'components/Button';
import {PagePanel} from 'components/PagePanel';
import ProfileDetails from 'components/Profile/ProfileDetails';
import SkillList from 'components/Profile/SkillList';
import PageHeader from 'components/Common/Layout/PageHeader';
import routes from 'constants/routes';

export default function MyProfile() {
  return (
    <>
      <PageHeader
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
      />
      <PagePanel>
        <ProfileDetails />
        <SkillList />
      </PagePanel>
    </>
  );
}
