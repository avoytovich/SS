import {makeStyles} from '@mui/styles';

import {DARK_GREY, RED} from 'theme/colors';

const useStyles = makeStyles({
  label: {
    '&.MuiInputLabel-root': {
      background: 'transparent',
      border: 0,
      fontSize: '14px',
      fontWeight: 500,
      color: DARK_GREY,
      padding: '0 0 4px'
    }
  },
  selectWrapper: {
    background: 'transparent',
    margin: '0 0 16px',
    padding: '0',
    fontSize: '14px',
    width: '100%',
    color: DARK_GREY,
    '& .MuiSvgIcon-root': {
      color: DARK_GREY
    },
    '& .MuiFormControl-root .MuiOutlinedInput-root': {
      padding: '4px 9px'
    },
    '& .Mui-error': {
      '& .MuiSvgIcon-root': {
        color: RED
      }
    }
  }
});

export default useStyles;
