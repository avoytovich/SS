import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: '8px 8px 14px 16px',
    minWidth: 240,
    flexWrap: 'wrap',
    gap: '10px'
  },
  tableEmptyMessage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  toolbarContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  toolbarBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '315px'
  }
}));
