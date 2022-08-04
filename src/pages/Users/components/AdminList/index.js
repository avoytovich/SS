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
import {useFetchManagementsQuery} from 'services/users';
import {UserRoleEnum} from 'constants/userRoles';
import usePermissions from 'hooks/permissions';
import {PermissionEnum} from 'constants/permissions';

import headCells from '../constants';
import DeleteIcon from '../DeleteIcon';

const AdminList = ({onDeleteRole}) => {
  const {profile} = useSelector(state => state.auth);
  const {hasPermissions} = usePermissions();
  const {data = []} = useFetchManagementsQuery({role: UserRoleEnum.ADMIN});

  const hasDeletePermissions = userId =>
    profile.id !== userId && hasPermissions([PermissionEnum.USERS_MANAGMENT_DELETE]);

  return (
    <TableContainer>
      <Table id="user-admin-list">
        <TableHead headCells={headCells} />
        <TableBody>
          {data.map(admin => (
            <TableRow key={admin.id}>
              <TableCell>{admin.full_name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>
                {hasDeletePermissions(admin.id) && (
                  <DeleteIcon onClick={() => onDeleteRole(admin)} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data.length === 0 && <NoRowsOverlay />}
    </TableContainer>
  );
};

AdminList.propTypes = {
  onDeleteRole: PropTypes.func.isRequired
};

export default AdminList;
