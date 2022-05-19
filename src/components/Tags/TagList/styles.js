import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  tagBox: {
    height: '100%'
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: '10px 8px',
    minWidth: 240
  },
  searchField: {
    minWidth: 233
  },
  tableEmptyMessage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }
}));
