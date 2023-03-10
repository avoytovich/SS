import {grey} from '@mui/material/colors';

const dataGridRootStyles = {
  minHeight: 400,
  height: '100%',
  border: 0,
  '.MuiDataGrid-columnSeparator': {
    display: 'none'
  },
  '.MuiDataGrid-columnHeader': {
    fontSize: '13px',
    lineHeight: '24px',
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.54)'
  },
  '.MuiDataGrid-row, .MuiDataGrid-cell, .MuiDataGrid-columnHeaders': {
    borderTop: 'none',
    borderBottom: `1px solid ${grey[100]}`,
    outline: 0
  },
  '.MuiDataGrid-footerContainer': {
    borderTop: 'none'
  },
  '.MuiDataGrid-cell:focus-within, .MuiDataGrid-columnHeader:focus-within': {
    outline: 'none !important'
  },
  '.MuiDataGrid-cell': {
    padding: '0 16px',
    fontSize: '13px',
    lineHeight: '24px',
    color: 'rgba(0, 0, 0, 0.87)'
  }
};

export default dataGridRootStyles;
