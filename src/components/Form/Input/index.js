import MuiInput from '@mui/material/Input';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

// common MuiInput styles should go here
const StyledMuiInput = styled(MuiInput)(({theme}) => ({
  background: '#fff',
  margin: '0',
  padding: '0',
  fontSize: '14px',
  borderRadius: '4px',
  border: '1px solid #ECECEC',
  '&.MuiInputBase-root': {
    padding: '0',
    margin: '0',
    background: 'transparent'
  },
  '& .MuiFormHelperText-root': {
    margin: '4px 0 8px'
  },
  '&.Mui-error': {
    borderColor: theme.palette.error.main,
    '& input, & textarea': {
      color: theme.palette.error.main
    }
  },
  '& .MuiOutlinedInput-input': {
    padding: '8px 8px 9px',
    borderRadius: '4px'
  }
}));

// eslint-disable-next-line no-use-before-define
Input.propTypes = {
  children: PropTypes.node
};

function Input(props) {
  const {children, ...restProps} = props;

  return <StyledMuiInput {...restProps}>{children}</StyledMuiInput>;
}

export default Input;
