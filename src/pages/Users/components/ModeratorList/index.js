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
import {useFetchManagementsQuery} from 'services/users';
import {UserRoleEnum} from 'constants/userRoles';
import usePermissions from 'hooks/permissions';
import {PermissionEnum} from 'constants/permissions';

import headCells from '../constants';

const ModeratorList = ({onDeleteRole}) => {
  const {hasPermissions} = usePermissions();
  const {data = []} = useFetchManagementsQuery({role: UserRoleEnum.MODERATOR});

  return (
    <TableContainer>
      <Table id="user-moderator-list">
        <TableHead headCells={headCells} />
        <TableBody>
          {data.map(moderator => (
            <TableRow key={moderator.id}>
              <TableCell>{moderator.full_name}</TableCell>
              <TableCell>{moderator.email}</TableCell>
              <TableCellAction>
                {hasPermissions([PermissionEnum.USERS_MANAGMENT_DELETE]) && (
                  <IconButton onClick={() => onDeleteRole(moderator)}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </TableCellAction>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data.length === 0 && <NoRowsOverlay />}
    </TableContainer>
  );
};

ModeratorList.propTypes = {
  onDeleteRole: PropTypes.func.isRequired
};

export default ModeratorList;
