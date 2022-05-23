import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  skillsBox: {
    height: '100%'
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0 0 20px'
  },
  form: {
    margin: '0 8px',
    minWidth: 220,
    display: 'flex',
    flexDirection: 'row'
  },
  tableEmptyMessage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }
}));
