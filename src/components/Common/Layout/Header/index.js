import * as React from 'react';
import {NavLink as RouterLink} from 'react-router-dom';

import {AppBar, Box, Toolbar, Link} from '@mui/material';

import usePermissions from 'hooks/permissions';
import routes from 'constants/routes';
import logo from 'assets/images/SmartSkills.svg';

import UserMenu from 'components/Common/Layout/Header/UserMenu';
import {useStyles} from 'components/Common/Layout/Header/styles';
import {navigationLinks} from 'constants/header';

const isActiveFn = path => (match, location) => location.pathname.startsWith(path);

const Header = () => {
  const classes = useStyles();
  const {hasPermissions} = usePermissions();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Link component={RouterLink} to={routes.home} exact={true} activeClassName={classes.active}>
          <img src={logo} alt="SmartSkills" />
        </Link>
        <Box className={classes.navContent}>
          {navigationLinks.map(link =>
            hasPermissions(link.permissions) ? (
              <Link
                key={link.key}
                component={RouterLink}
                to={link.pathName}
                exact={link.exact}
                isActive={isActiveFn(link.pathName)}
              >
                {link.linkName}
              </Link>
            ) : null
          )}
        </Box>
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
