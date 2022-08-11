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

const ModeratorList = ({moderators, onDeleteRole}) => {
  const {hasPermissions} = usePermissions();

  return (
    <TableContainer>
      <Table id="user-moderator-list">
        <TableHead headCells={headCells} />
        <TableBody>
          {moderators.map(moderator => (
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
      {moderators.length === 0 && <NoRowsOverlay />}
    </TableContainer>
  );
};

ModeratorList.propTypes = {
  onDeleteRole: PropTypes.func.isRequired,
  moderators: PropTypes.array.isRequired
};

export default ModeratorList;
