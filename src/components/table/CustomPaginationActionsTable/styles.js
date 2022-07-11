import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
  loadingRow: {
    height: ({rowsPerPage}) => 23 * rowsPerPage
  },
  emptyRow: {
    height: ({emptyRows}) => 23 * emptyRows
  },
  customTableContainer: {
    overflowX: 'initial'
  }
});

export default useStyles;
