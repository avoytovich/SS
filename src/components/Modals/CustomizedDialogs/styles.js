import {makeStyles} from '@mui/styles';
import {WHITE} from 'theme/colors';

const useStyles = makeStyles({
  title: {
    '&.MuiTypography-root': {
      padding: '16px 16px 8px'
    },
    background: WHITE,
    border: 0
  },
  actions: {
    background: WHITE,
    border: 0,
    padding: '16px'
  },
  content: {
    '&.MuiDialogContent-root': {
      padding: '0 16px 16px'
    }
  },
  loader: {
    margin: '80px 0 32px',
    textAlign: 'center'
  },
  contentDesc: {
    '&.MuiTypography-root': {
      fontSize: '14px',
      marginBottom: '16px'
    }
  }
});

export default useStyles;
