import React from 'react';
import Paper from '@mui/material/Paper';
import MuiTableContainer from '@mui/material/TableContainer';
import {styled} from '@mui/material/styles';

const StyledTablePaper = styled(Paper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  boxShadow: 'none'
}));

const TableContainer = props => <MuiTableContainer component={StyledTablePaper} {...props} />;

export default TableContainer;
