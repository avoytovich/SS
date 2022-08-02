import React from 'react';
import {useSelector} from 'react-redux';
import {NavLink as RouterLink} from 'react-router-dom';
import {Box, MenuItem} from '@mui/material';

import useModal from 'hooks/useModal';
import routes from 'constants/routes';
import {StyledMenu} from 'components/Common/Layout/Header/styles';
import {ButtonText} from 'components/Button';
import Avatar from 'components/Avatar';

export default function UserMenu() {
  const {profile, profilePhoto} = useSelector(state => state.auth);
  const {isOpen, toggle} = useModal();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const userName = `${profile?.first_name} ${profile?.last_name}`;

  const handleClick = event => {
    toggle();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    toggle();
    setAnchorEl(null);
  };

  return (
    <Box id="user-menu-container" marginLeft="auto">
      <ButtonText
        id="user-menu-button"
        aria-controls={isOpen ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar src={profilePhoto} name={userName} />
        {userName}
      </ButtonText>
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
      </StyledMenu>
    </Box>
  );
}
