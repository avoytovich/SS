import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
  titleWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '30px 0',
    margin: 0,
    boxSizing: 'border-box'
  },
  wrapExtra: {
    '& .MuiButton-root': {
      marginLeft: '15px'
    }
  }
});

export default useStyles;
