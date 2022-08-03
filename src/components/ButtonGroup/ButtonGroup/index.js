import MuiButtonGroup from '@mui/material/ButtonGroup';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

// common MuiButtonGroup styles should go here
const StyledMuiButtonGroup = styled(MuiButtonGroup)(() => ({}));

// eslint-disable-next-line no-use-before-define
ButtonGroup.propTypes = {
  children: PropTypes.node
};

function ButtonGroup(props) {
  const {children, ...restProps} = props;

  return <StyledMuiButtonGroup {...restProps}>{children}</StyledMuiButtonGroup>;
}

export default ButtonGroup;
