import {makeStyles} from '@material-ui/core';
import {grey} from '@mui/material/colors';

export const tagStyles = {
  minHeight: 500,
  height: '100%',
  border: 0,
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
  '.MuiDataGrid-cell:focus-within, .MuiDataGrid-columnHeader:focus-within': {
    outline: 'none !important'
  }
};

export const rootStyles = {
  height: '100%'
};

export const useStyles = makeStyles(() => ({
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0 0 20px'
  },
  form: {
    margin: '0 8px',
    minWidth: 220,
    display: 'flex',
    flexDirection: 'row'
  },
  cleanupButton: {
    display: 'flex',
    margin: '18px 0 0 10px'
  },
  tableEmptyMessage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }
}));
