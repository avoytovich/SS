import {styled} from '@mui/material/styles';
import {TextField, Typography} from '@mui/material';

export const StyledLi = styled('li')(({theme}) => ({
  backgroundColor: theme.palette.common.white,
  padding: 0,
  '&.MuiAutocomplete-option': {
    margin: 0
  }
}));

export const StyledTypography = styled(Typography)(() => ({
  paddingLeft: '6px',
  width: 300,
  fontSize: 14,
  fontWeight: 300,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}));

export const StyledTextField = styled(TextField, {
  shouldForwardProp: prop => prop !== 'disabled'
})(({theme, disabled, width}) => ({
  color: disabled ? theme.palette.common.black : theme.palette.primary.main,
  backgroundColor: disabled ? theme.palette.grey[50] : theme.palette.common.white,
  minWidth: width || 240,
  '.MuiOutlinedInput-root .MuiAutocomplete-input': {
    padding: '8.5px 2px',
    fontSize: 16
  }
}));

export const StyledInputContent = styled('span')(({theme}) => ({
  maxWidth: 147,
  margin: 0,
  paddingLeft: '8px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: 16,
  color: theme.palette.grey[700]
}));

export const StyledIcon = styled('span')(({theme}) => ({
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  '& svg': {
    fontSize: '18px'
  },
  '&:hover': {
    'svg > path': {
      fill: theme.palette.primary.main
    }
  }
}));
