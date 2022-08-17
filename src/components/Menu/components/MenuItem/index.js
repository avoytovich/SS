import PropTypes from 'prop-types';
import MuiMenuItem from '@mui/material/MenuItem';
import {styled} from '@mui/material/styles';

const StyledMenuItem = styled(MuiMenuItem)(() => ({}));

const MenuItem = props => {
  const {children, ...restProps} = props;

  return <StyledMenuItem {...restProps}>{children}</StyledMenuItem>;
};

MenuItem.propTypes = {
  children: PropTypes.node
};

export default MenuItem;
