import React from 'react';
import PropTypes from 'prop-types';

import {UserRoleEnum} from 'constants/userRoles';
import {Tab, Tabs} from 'components/Tabs';

const UsersTabs = ({tab, onChange}) => {
  const handleChangeTab = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <Tabs value={tab} onChange={handleChangeTab} aria-label="skill tabs">
      <Tab value={UserRoleEnum.ADMIN} data-testid="user-page-tab-admins" label="Admins" />
      <Tab
        value={UserRoleEnum.MODERATOR}
        data-testid="user-page-tab-moderators"
        label="Moderators"
      />
      <Tab value={UserRoleEnum.MANAGER} data-testid="user-page-tab-managers" label="Managers" />
    </Tabs>
  );
};

UsersTabs.propTypes = {
  tab: PropTypes.oneOf([UserRoleEnum.ADMIN, UserRoleEnum.MODERATOR, UserRoleEnum.MANAGER])
    .isRequired,
  onChange: PropTypes.func.isRequired
};

export default UsersTabs;
