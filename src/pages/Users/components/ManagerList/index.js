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

const ManagerList = ({onDeleteRole}) => {
  const {hasPermissions} = usePermissions();
  const {data = []} = useFetchManagementsQuery({role: UserRoleEnum.MANAGER});

  return (
    <TableContainer>
      <Table id="user-manager-list">
        <TableHead headCells={headCells} />
        <TableBody>
          {data.map(manager => (
            <TableRow key={manager.id}>
              <TableCell>{manager.full_name}</TableCell>
              <TableCell>{manager.email}</TableCell>
              <TableCell>
                {hasPermissions([PermissionEnum.USERS_MANAGMENT_DELETE]) && (
                  <DeleteIcon onClick={() => onDeleteRole(manager)} />
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

ManagerList.propTypes = {
  onDeleteRole: PropTypes.func.isRequired
};

export default ManagerList;
