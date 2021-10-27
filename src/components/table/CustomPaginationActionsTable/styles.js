import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  loadingRow: {
    height: ({ rowsPerPage }) => 23 * rowsPerPage,
  },
  emptyRow: {
    height: ({ emptyRows }) => 23 * emptyRows,
  },
});
