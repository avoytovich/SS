import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink as RouterLink} from 'react-router-dom';

import {useModal} from 'hooks/useModal';
import routes from 'constants/routes';
import {logout} from 'store/auth';
import {clearPermissions} from 'store/permissions/permissions';

import {Box, Button, MenuItem} from '@mui/material';
import {StyledMenu} from 'components/Common/Layout/Header/styles';

export default function UserMenu() {
  const dispatch = useDispatch();
  const {profile, auth} = useSelector(state => state.auth);
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

  const onLogout = () => {
    dispatch(logout());
    dispatch(clearPermissions());
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
        {/* TODO:Remove auth.name after integration SSO on backend side */}
        {auth.name ? auth.name : `${profile?.first_name} ${profile?.last_name}`}
      </Button>
      <StyledMenu
        id="user-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          'aria-labelledby': 'user-menu-button'
        }}
      >
        <MenuItem component={RouterLink} to={routes.profile} exact={true}>
          Profile
        </MenuItem>
        <MenuItem onClick={onLogout} component={RouterLink} to={routes.login} exact={true}>
          Logout
        </MenuItem>
      </StyledMenu>
    </Box>
  );
}
