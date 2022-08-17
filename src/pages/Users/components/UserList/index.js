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

import headCells from '../constants';

const UserList = ({users, hasDeletePermissions, isAdmin, onDeleteRole}) => {
  const {profile} = useSelector(state => state.auth);

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
                  {(isAdmin ? profile.id !== user.id : hasDeletePermissions) && (
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
  users: PropTypes.array.isRequired,
  hasDeletePermissions: PropTypes.bool,
  isAdmin: PropTypes.bool
};

UserList.defaultProps = {
  isAdmin: false,
  hasDeletePermissions: false
};

export default UserList;
