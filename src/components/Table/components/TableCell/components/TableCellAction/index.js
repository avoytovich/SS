import {styled} from '@mui/material/styles';

import TableCell from '../TableCell';

const StyledTableCell = styled(TableCell)(() => ({
  float: 'right'
}));

const TableCellAction = props => <StyledTableCell {...props} />;

export default TableCellAction;
