import {grey} from '@mui/material/colors';

export const dataGridRootStyles = {
  minHeight: 500,
  height: '100%',
  border: 0,
  '& .firstColumn': {
    paddingLeft: '16px'
  },
  '& .lastHeader': {
    paddingRight: '16px'
  },
  '.MuiDataGrid-columnSeparator': {
    display: 'none'
  },
  '.MuiDataGrid-columnHeader': {
    fontSize: '13px',
    lineHeight: '24px',
    fontWeight: 500,
    color: grey[500]
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
  }
};
