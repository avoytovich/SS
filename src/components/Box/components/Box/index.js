import MuiBox from '@mui/material/Box';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

// common MuiBox styles should go here
const StyledMuiBox = styled(MuiBox)(() => ({}));

// eslint-disable-next-line no-use-before-define
Box.propTypes = {
  children: PropTypes.node
};

function Box(props) {
  const {children, ...restProps} = props;

  return <StyledMuiBox {...restProps}>{children}</StyledMuiBox>;
}

export default Box;
