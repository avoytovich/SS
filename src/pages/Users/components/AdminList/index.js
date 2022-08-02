import {useSelector} from 'react-redux';

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

const AdminList = () => {
  const {profile} = useSelector(state => state.auth);
  const {data = []} = useFetchManagementsQuery({role: UserRoleEnum.ADMIN});

  const handleDeleteAdmin = () => {};

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
                {profile.id !== admin.id && <DeleteIcon onClick={handleDeleteAdmin} />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data.length === 0 && <NoRowsOverlay />}
    </TableContainer>
  );
};

export default AdminList;
