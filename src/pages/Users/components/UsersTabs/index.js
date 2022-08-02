import React from 'react';

import {Tab, Tabs} from 'components/Tabs';

const UsersTabs = ({tab, onChange}) => {
  const handleChangeTab = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <Tabs value={tab} onChange={handleChangeTab} aria-label="skill tabs">
      <Tab data-testid="user-page-tab-admins" label="Admins" />
      <Tab data-testid="user-page-tab-moderators" label="Moderators" />
      <Tab data-testid="user-page-tab-managers" label="Managers" />
    </Tabs>
  );
};

export default UsersTabs;
