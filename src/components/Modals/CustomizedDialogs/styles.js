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
    '&.MuiDialogActions-root': {
      background: WHITE,
      border: 0,
      padding: '16px'
    }
  },
  content: {
    '&.MuiDialogContent-root': {
      padding: '0 16px 16px'
    }
  },
  loader: {
    margin: '0',
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    padding: '0',
    height: '100%',
    top: '0',
    left: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1',
    background: 'rgba(255,255,255,0.4)'
  },
  contentDesc: {
    '&.MuiTypography-root': {
      fontSize: '14px',
      marginBottom: '16px'
    }
  }
});

export default useStyles;
