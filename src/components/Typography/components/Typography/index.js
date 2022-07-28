import PropTypes from 'prop-types';
import MuiTypography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';

// common MuiTypography styles should go here
const StyledMuiTypography = styled(MuiTypography)(() => ({
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '18px',
  color: '#000000'
}));

// eslint-disable-next-line no-use-before-define
Typography.propTypes = {
  children: PropTypes.node
};

function Typography(props) {
  const {children, ...restProps} = props;

  return <StyledMuiTypography {...restProps}>{children}</StyledMuiTypography>;
}

export default Typography;
