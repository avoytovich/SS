import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: '8px 0 14px',
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

export default useStyles;
