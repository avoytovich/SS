import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  skillBox: {
    height: '100%'
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: '8px 0 14px',
    minWidth: 240,
    flexWrap: 'wrap',
    gap: '18px'
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

export default useStyles;
