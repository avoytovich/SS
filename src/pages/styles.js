import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  parentScrollContainer: {
    overflow: 'hidden',
    flexGrow: 1,
    minHeight: '250px',
    position: 'relative',
  },
  parentScroll: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'auto',
  },
});
