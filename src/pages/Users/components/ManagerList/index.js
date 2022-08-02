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

const ManagerList = () => {
  const {data = []} = useFetchManagementsQuery({role: UserRoleEnum.MANAGER});

  const handleDeleteManager = () => {};

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
                <DeleteIcon onClick={handleDeleteManager} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data.length === 0 && <NoRowsOverlay />}
    </TableContainer>
  );
};

export default ManagerList;
