import {useState} from 'react';
import {styled} from '@mui/material/styles';

import {Box} from 'components/Box';
import {ButtonContained} from 'components/Button';
import PageLayout from 'components/Common/Layout/PageLayout';
import usePermissions from 'hooks/permissions';
import useModal from 'hooks/useModal';
import {PermissionEnum} from 'constants/permissions';
import {UserRoleEnum} from 'constants/userRoles';

import UsersTabs from './components/UsersTabs';
import TabPanel from './components/UsersTabs/TabPanel';
import CreateAdminModal from './components/CreateAdminModal';

const StyledBox = styled(Box)(() => ({
  marginTop: '-30px',
  height: '100%'
}));

const Users = () => {
  const {hasPermissions} = usePermissions();
  const createModal = useModal();
  const [tab, setTab] = useState(UserRoleEnum.ADMIN);

  const onToggleCreateAdmin = () => {
    createModal.toggle();
  };

  const extraButtons = hasPermissions([PermissionEnum.USERS_MANAGMENT_CREATE])
    ? [
        <ButtonContained
          key="user-page-create-btn"
          data-testid="user-page-create-btn"
          onClick={onToggleCreateAdmin}
        >
          Add Admin
        </ButtonContained>
      ]
    : [];

  return (
    <PageLayout title="Users" type="users-page" extra={extraButtons}>
      <StyledBox>
        <UsersTabs tab={tab} onChange={setTab} />
        <TabPanel tab={tab} />
      </StyledBox>
      {createModal.isOpen && (
        <CreateAdminModal tab={tab} isOpen={createModal.isOpen} onClose={onToggleCreateAdmin} />
      )}
    </PageLayout>
  );
};

export default Users;
