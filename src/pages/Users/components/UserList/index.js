import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  NoRowsOverlay
} from 'components/Table';
import {Box} from 'components/Box';
import {DeleteIcon} from 'components/Icons';
import {IconButton} from 'components/Button';
import usePermissions from 'hooks/permissions';

import headCells from '../constants';
import {PermissionEnum} from '../../../../constants/permissions';

const UserList = ({users, onDeleteRole}) => {
  const {profile} = useSelector(state => state.auth);
  const {hasPermissions} = usePermissions();

  const isShowRemoveButton = userId =>
    profile.id !== userId && hasPermissions([PermissionEnum.USERS_MANAGMENT_DELETE]);

  return (
    <TableContainer>
      <Table id="user-list">
        <TableHead headCells={headCells} />
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.full_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Box display="flex" justifyContent="flex-end">
                  {isShowRemoveButton(user.id) &&
                    hasPermissions([PermissionEnum.USERS_MANAGMENT_DELETE]) && (
                      <IconButton onClick={() => onDeleteRole(user)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {users.length === 0 && <NoRowsOverlay />}
    </TableContainer>
  );
};

UserList.propTypes = {
  onDeleteRole: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

export default UserList;
