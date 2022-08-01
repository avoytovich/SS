import MuiTableRow from '@mui/material/TableRow';
import {styled} from '@mui/material/styles';

const StyledTableRow = styled(MuiTableRow)(({theme}) => ({
  height: '43px',
  borderBottom: `1px solid ${theme.palette.grey[100]}`
}));

const TableRow = props => <StyledTableRow {...props} />;

export default TableRow;
