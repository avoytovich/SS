import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  skillBox: {
    height: '100%'
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: '8px 8px 14px 16px',
    minWidth: 240,
    flexWrap: 'wrap',
    gap: '10px'
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
