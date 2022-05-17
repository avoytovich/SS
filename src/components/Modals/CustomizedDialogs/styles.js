import {makeStyles} from '@mui/styles';
import {WHITE} from 'theme/colors';

const useStyles = makeStyles({
  title: {
    background: WHITE,
    border: 0,
    padding: '16px 16px 8px'
  },
  actions: {
    background: WHITE,
    border: 0,
    padding: '16px'
  },
  content: {
    padding: '0 16px 16px'
  },
  loader: {
    margin: '80px 0 32px',
    textAlign: 'center'
  },
  contentDesc: {
    fontSize: '14px',
    marginBottom: '16px'
  }
});

export default useStyles;
