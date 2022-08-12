import {useState} from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

import Menu from '../Menu';
import MenuItem from '../MenuItem';
import {ButtonOutlined} from '../../../Button';

const StyledDropdownMenu = styled('div')(() => ({}));

const DropdownMenu = props => {
  const {children, buttonName, items, disabled, onMenuItemClick, ...restProps} = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = item => {
    if (onMenuItemClick) onMenuItemClick(item);
  };

  return (
    <StyledDropdownMenu {...restProps}>
      <ButtonOutlined
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        disabled={disabled}
      >
        {buttonName}
      </ButtonOutlined>
      {items && !children && (
        <Menu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button'
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {items.map(item => (
            <MenuItem key={item.name} onClick={e => handleMenuClick(item, e)}>
              {item.name}
            </MenuItem>
          ))}
        </Menu>
      )}
      {children}
    </StyledDropdownMenu>
  );
};

DropdownMenu.propTypes = {
  items: PropTypes.array,
  buttonName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node
};

export default DropdownMenu;
