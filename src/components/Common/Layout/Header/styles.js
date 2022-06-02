import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  active: {
    backgroundColor: 'none'
  },
  navContent: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    fontSize: 90
  }
}));
