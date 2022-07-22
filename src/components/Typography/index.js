import MuiTypography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

// common MuiButton styles should go here
const StyledMuiTypography = styled(MuiTypography)(() => ({}));

// eslint-disable-next-line no-use-before-define
Typography.propTypes = {
  children: PropTypes.node
};

function Typography(props) {
  const {children, ...restProps} = props;

  return <StyledMuiTypography {...restProps}>{children}</StyledMuiTypography>;
}

export default Typography;
