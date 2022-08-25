import MuiInputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

// common MuiInputLabel styles should go here
const StyledMuiInputLabel = styled(MuiInputLabel)(({theme}) => ({
  background: 'transparent',
  border: 0,
  fontSize: '14px',
  fontWeight: 500,
  color: theme.palette.primary.black,
  padding: '0 0 4px'
}));

// eslint-disable-next-line no-use-before-define
InputLabel.propTypes = {
  children: PropTypes.node
};

function InputLabel(props) {
  const {children, ...restProps} = props;

  return <StyledMuiInputLabel {...restProps}>{children}</StyledMuiInputLabel>;
}

export default InputLabel;
