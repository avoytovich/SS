import {makeStyles} from '@material-ui/core';

const styles = makeStyles(() => ({
  tagBox: {
    height: '100%'
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: '8px 0 14px',
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

export default styles;
