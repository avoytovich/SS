import {useState} from 'react';
import {useSnackbar} from 'notistack';
import {styled} from '@mui/material/styles';

import {Box} from 'components/Box';
import {ButtonContained} from 'components/Button';
import PageLayout from 'components/Common/Layout/PageLayout';
import CustomizedDialogs from 'components/Modals/CustomizedDialogs';
import usePermissions from 'hooks/permissions';
import useModal from 'hooks/useModal';
import {PermissionEnum} from 'constants/permissions';
import {UserRoleEnum} from 'constants/userRoles';
import {TabPanelContainer, TabPanel, Tab, Tabs} from 'components/Tabs';
import {
  useFetchUserRolesQuery,
  useLazyFetchManagementsQuery,
  useSetUserRoleMutation
} from 'services/users';

import AdminList from './components/AdminList';
import ModeratorList from './components/ModeratorList';
import ManagerList from './components/ManagerList';
import CreateAdminModal from './components/CreateAdminModal';

const StyledBox = styled(Box)(() => ({
  marginTop: '-30px',
  height: '100%'
}));

const Users = () => {
  const {hasPermissions} = usePermissions();
  const {enqueueSnackbar} = useSnackbar();
  const {isOpen: isCreateModalOpen, toggle: toggleCreateModal} = useModal();
  const {
    isOpen: isRemoveModalOpen,
    toggle: toggleRemoveModal,
    setValues: setRemoveModalValues,
    values: {id: removeUserId, full_name: removeUserName}
  } = useModal();
  const [tab, setTab] = useState(UserRoleEnum.ADMIN);
  const {data: roles = []} = useFetchUserRolesQuery();
  const [setUserRole] = useSetUserRoleMutation();
  const [trigger] = useLazyFetchManagementsQuery({role: tab});

  const handleDeleteRole = user => {
    toggleRemoveModal();
    setRemoveModalValues(user);
  };

  const onCloseConfirmModal = () => {
    toggleRemoveModal();
    setRemoveModalValues({});
  };

  const setEmployeeRoleToUser = roleId => {
    setUserRole({role_id: roleId, id: removeUserId})
      .unwrap()
      .then(() => {
        enqueueSnackbar('User have successfully removed');
      })
      .catch(() => {
        enqueueSnackbar('User have not removed', {variant: 'error'});
      })
      .finally(() => {
        trigger();
        toggleRemoveModal();
      });
  };

  const handleConfirmDelete = () => {
    const employeeRole = roles.find(role => role.name === UserRoleEnum.EMPLOYEE);

    if (employeeRole?.id) {
      setEmployeeRoleToUser(employeeRole.id);
    }
  };

  const onToggleCreateAdmin = () => {
    toggleCreateModal();
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

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <PageLayout title="Users" type="users-page" extra={extraButtons}>
      <StyledBox>
        <Tabs value={tab} onChange={handleChangeTab} aria-label="skill tabs">
          <Tab value={UserRoleEnum.ADMIN} data-testid="user-page-tab-admins" label="Admins" />
          <Tab
            value={UserRoleEnum.MODERATOR}
            data-testid="user-page-tab-moderators"
            label="Moderators"
          />
          <Tab value={UserRoleEnum.MANAGER} data-testid="user-page-tab-managers" label="Managers" />
        </Tabs>
        <TabPanelContainer>
          <TabPanel value={tab} index={UserRoleEnum.ADMIN}>
            <AdminList onDeleteRole={handleDeleteRole} />
          </TabPanel>
          <TabPanel value={tab} index={UserRoleEnum.MODERATOR}>
            <ModeratorList onDeleteRole={handleDeleteRole} />
          </TabPanel>
          <TabPanel value={tab} index={UserRoleEnum.MANAGER}>
            <ManagerList onDeleteRole={handleDeleteRole} />
          </TabPanel>
        </TabPanelContainer>
      </StyledBox>
      {isCreateModalOpen && (
        <CreateAdminModal tab={tab} isOpen={isCreateModalOpen} onClose={onToggleCreateAdmin} />
      )}
      {isRemoveModalOpen && (
        <CustomizedDialogs
          isOpen={isRemoveModalOpen}
          isRemove
          onClose={onCloseConfirmModal}
          handleSubmit={handleConfirmDelete}
          text={`Remove permission for user "${removeUserName}.`}
          confirmText="Remove"
        />
      )}
    </PageLayout>
  );
};

export default Users;
