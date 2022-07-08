import MuiButton from '@mui/material/Button';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

// common MuiButton styles should go here
const StyledMuiButton = styled(MuiButton)(() => ({
  textTransform: 'none'
}));

// eslint-disable-next-line no-use-before-define
Button.propTypes = {
  children: PropTypes.node
};

function Button(props) {
  const {children, ...restProps} = props;

  return <StyledMuiButton {...restProps}>{children}</StyledMuiButton>;
}

export {Button};
