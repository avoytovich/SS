import PropTypes from 'prop-types';
import MuiMenu from '@mui/material/Menu';
import {styled} from '@mui/material/styles';

const StyledDropdownMenu = styled(MuiMenu)(() => ({}));

const DropdownMenu = props => {
  const {children, ...restProps} = props;

  return <StyledDropdownMenu {...restProps}>{children}</StyledDropdownMenu>;
};

DropdownMenu.propTypes = {
  children: PropTypes.node
};

export default DropdownMenu;
