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

const ManagerList = ({managers, onDeleteRole}) => {
  const {hasPermissions} = usePermissions();

  return (
    <TableContainer>
      <Table id="user-manager-list">
        <TableHead headCells={headCells} />
        <TableBody>
          {managers.map(manager => (
            <TableRow key={manager.id}>
              <TableCell>{manager.full_name}</TableCell>
              <TableCell>{manager.email}</TableCell>
              <TableCellAction>
                {hasPermissions([PermissionEnum.USERS_MANAGMENT_DELETE]) && (
                  <IconButton onClick={() => onDeleteRole(manager)}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </TableCellAction>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {managers.length === 0 && <NoRowsOverlay />}
    </TableContainer>
  );
};

ManagerList.propTypes = {
  onDeleteRole: PropTypes.func.isRequired,
  managers: PropTypes.array.isRequired
};

export default ManagerList;
