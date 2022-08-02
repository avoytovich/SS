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

import headCells from '../constants';
import DeleteIcon from '../DeleteIcon';

const ModeratorList = () => {
  const {data = []} = useFetchManagementsQuery({role: UserRoleEnum.MODERATOR});

  const handleDeleteModerator = () => {};

  return (
    <TableContainer>
      <Table id="user-moderator-list">
        <TableHead headCells={headCells} />
        <TableBody>
          {data.map(moderator => (
            <TableRow key={moderator.id}>
              <TableCell>{moderator.full_name}</TableCell>
              <TableCell>{moderator.email}</TableCell>
              <TableCell>
                <DeleteIcon onClick={handleDeleteModerator} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data.length === 0 && <NoRowsOverlay />}
    </TableContainer>
  );
};

export default ModeratorList;
