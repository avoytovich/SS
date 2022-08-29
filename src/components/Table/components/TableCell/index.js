import {styled} from '@mui/material/styles';
import MuiTableCell from '@mui/material/TableCell';

const StyledTableCell = styled(MuiTableCell, {
  shouldForwardProp: prop => prop !== 'maxWidth'
})(({maxWidth}) => ({
  width: 'max-content',
  maxWidth,
  padding: 5
}));

const TableCell = props => <StyledTableCell {...props} />;

export default TableCell;
