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
  inputWrapper: {
    '&.MuiFormControl-root': {
      background: 'transparent',
      margin: '0 0 16px',
      padding: '0',
      '& > .MuiInputBase-root': {
        background: 'transparent'
      },
      '& .MuiFormHelperText-root': {
        margin: '4px 0 8px'
      },
      '& .Mui-error': {
        '& input': {
          color: RED,
          borderColor: RED
        }
      }
    }
  },
  input: {
    '&.MuiOutlinedInput-input': {
      padding: '8px 8px 9px',
      border: '1px solid #ECECEC',
      borderRadius: '4px'
    },

    '&.MuiInputBase-root': {
      background: 'transparent',
      padding: '8px 8px 9px',
      border: '1px solid #ECECEC',
      borderRadius: '4px',
      fontSize: '14px',
      '& + fieldset': {
        display: 'none'
      }
    }
  }
});

export default useStyles;
