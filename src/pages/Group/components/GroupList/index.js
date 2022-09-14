import {useCallback} from 'react';
import PropTypes from 'prop-types';

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  NoRowsOverlay,
  TablePagination
} from 'components/Table';
import {PageLoader} from 'components/Loader';
import {Box} from 'components/Box';
import {SearchField} from 'components/Common/DataGrid';
import {DeleteIcon, EditIcon} from 'components/Icons';
import {IconButton} from 'components/Button';
import usePermissions from 'hooks/permissions';
import useTable from 'hooks/useTable';
import {PermissionEnum} from 'constants/permissions';
import {useDeleteGroupMutation, useFetchGroupsQuery} from 'services/groups';
import {useURLParams} from 'hooks/dataGrid';
import useModal from 'hooks/useModal';

import DeleteGroupModal from '../DeleteGroupModal';

const headCells = [
  {key: 'name', label: 'Group Name', sortable: true},
  {key: 'skills_count', label: '# of skills'},
  {key: 'action', label: 'Actions', align: 'right'}
];

const GroupList = ({onUpdate}) => {
  const {clearQueryParams} = useURLParams();
  const {hasPermissions} = usePermissions();
  const {page, search, sort, onSearchChange} = useTable();
  const [deleteGroup] = useDeleteGroupMutation();
  const {
    isOpen,
    setIsOpen: setOpenDeleteModal,
    setValues: setDeleteModalGroup,
    values: selectedGroup
  } = useModal();
  const {
    data: {groups = [], pages = 0} = {},
    isLoading,
    isError
  } = useFetchGroupsQuery({
    ...(page && {page}),
    ...(search && {search}),
    ...(sort && {sort})
  });
  const emptyMessage =
    isError || search || sort ? 'No groups. Please select other filters' : 'No groups yet';

  const handleEditTag = group => {
    onUpdate({
      groupName: group.name,
      ...group
    });
  };

  const handleDeleteGroup = group => {
    setDeleteModalGroup(group);
    setOpenDeleteModal(true);

    if (groups.length === 1) {
      clearQueryParams();
    }
  };

  const handleDeleteGroupCancel = useCallback(() => {
    setOpenDeleteModal(false);
  }, [setOpenDeleteModal]);

  const handleDeleteGroupConfirm = useCallback(() => {
    deleteGroup({id: selectedGroup.id});
    setOpenDeleteModal(false);
  }, [deleteGroup, setOpenDeleteModal, selectedGroup]);

  const handleClearSearch = () => {
    onSearchChange('');
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <TableContainer>
        <Box component="form">
          <SearchField
            id="group-name-search"
            value={search}
            label="Search by name"
            onChange={onSearchChange}
            onClear={handleClearSearch}
          />
        </Box>
        <Table id="group-list">
          <TableHead headCells={headCells} />
          <TableBody>
            {groups.map(group => (
              <TableRow key={group.id}>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.skills_count}</TableCell>
                <TableCell>
                  <Box display="flex" justifyContent="flex-end">
                    {hasPermissions([PermissionEnum.GROUPS_EDIT]) && (
                      <IconButton onClick={() => handleEditTag(group)}>
                        <EditIcon />
                      </IconButton>
                    )}
                    {hasPermissions([PermissionEnum.GROUPS_DELETE]) && (
                      <IconButton onClick={() => handleDeleteGroup(group)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {groups.length === 0 && <NoRowsOverlay emptyMessage={emptyMessage} />}
        <TablePagination count={pages} />
      </TableContainer>
      <DeleteGroupModal
        onCancel={handleDeleteGroupCancel}
        onConfirm={handleDeleteGroupConfirm}
        open={isOpen}
        group={selectedGroup}
      />
    </>
  );
};

GroupList.propTypes = {
  onUpdate: PropTypes.func.isRequired
};

export default GroupList;
