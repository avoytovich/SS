import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import {useDispatch, useSelector} from 'react-redux';
import {useModal} from '../../common/hooks';
import {logOut} from '../../slices/auth';

export default function UserMenu() {
  const dispatch = useDispatch();
  const {profile} = useSelector(state => state.auth);
  const {isOpen, toggle} = useModal();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    toggle();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    toggle();
    setAnchorEl(null);
  };

  const onLogoutClick = () => {
    dispatch(logOut());
    handleClose();
  };

  return (
    <Box id="user-menu-container" marginLeft="auto">
      <Button
        id="user-menu-button"
        aria-controls={isOpen ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleClick}
      >
        {`${profile?.first_name} ${profile?.last_name}`}
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'user-menu-button'
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
