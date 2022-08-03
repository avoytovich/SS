import PropTypes from 'prop-types';

import {TabPagePanel} from 'components/Tabs';
import {UserRoleEnum} from 'constants/userRoles';

import AdminList from '../AdminList';
import ModeratorList from '../ModeratorList';
import ManagerList from '../ManagerList';

const Component = ({tab}) => {
  switch (tab) {
    case UserRoleEnum.MODERATOR:
      return <ModeratorList />;
    case UserRoleEnum.MANAGER:
      return <ManagerList />;
    case UserRoleEnum.ADMIN:
    default:
      return <AdminList />;
  }
};

const TabPanel = ({tab}) => (
  <TabPagePanel>
    <Component tab={tab} />
  </TabPagePanel>
);

TabPanel.propTypes = {
  tab: PropTypes.oneOf([UserRoleEnum.ADMIN, UserRoleEnum.MODERATOR, UserRoleEnum.MANAGER])
    .isRequired
};

export default TabPanel;
