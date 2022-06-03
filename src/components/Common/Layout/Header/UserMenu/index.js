import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink as RouterLink} from 'react-router-dom';

import {Box, Button, MenuItem} from '@mui/material';
import {StyledMenu} from 'components/Common/Layout/Header/styles';
import {useModal} from 'hooks/useModal';
import {logOut} from 'slices/auth';
import routes from 'constants/routes';

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

  const onLogout = () => dispatch(logOut());

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
