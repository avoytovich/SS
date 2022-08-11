import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCellAction,
  NoRowsOverlay
} from 'components/Table';
import {DeleteIcon} from 'components/Icons';
import {IconButton} from 'components/Button';
import usePermissions from 'hooks/permissions';
import {PermissionEnum} from 'constants/permissions';

import headCells from '../constants';

const AdminList = ({admins, onDeleteRole}) => {
  const {profile} = useSelector(state => state.auth);
  const {hasPermissions} = usePermissions();

  const hasDeletePermissions = userId =>
    profile.id !== userId && hasPermissions([PermissionEnum.USERS_MANAGMENT_DELETE]);

  return (
    <TableContainer>
      <Table id="user-admin-list">
        <TableHead headCells={headCells} />
        <TableBody>
          {admins.map(admin => (
            <TableRow key={admin.id}>
              <TableCell>{admin.full_name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCellAction>
                {hasDeletePermissions(admin.id) && (
                  <IconButton onClick={() => onDeleteRole(admin)}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </TableCellAction>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {admins.length === 0 && <NoRowsOverlay />}
    </TableContainer>
  );
};

AdminList.propTypes = {
  onDeleteRole: PropTypes.func.isRequired,
  admins: PropTypes.array.isRequired
};

export default AdminList;
