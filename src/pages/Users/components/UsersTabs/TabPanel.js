import {TabPagePanel} from 'components/Tabs';

import AdminList from '../AdminList';
import ModeratorList from '../ModeratorList';
import ManagerList from '../ManagerList';

const Component = ({tab}) => {
  switch (tab) {
    case 1:
      return <ModeratorList />;
    case 2:
      return <ManagerList />;
    case 0:
    default:
      return <AdminList />;
  }
};

const TabPanel = ({tab}) => (
  <TabPagePanel>
    <Component tab={tab} />
  </TabPagePanel>
);

export default TabPanel;
