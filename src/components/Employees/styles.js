import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  filterSearchContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  filterClearContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '16px'
  },
  filtersContainer: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: 240,
    flexWrap: 'wrap',
    gap: '8px'
  }
}));

export default useStyles;
