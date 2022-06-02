import * as React from 'react';
import {NavLink as RouterLink} from 'react-router-dom';

import {AppBar, Box, Toolbar, Link} from '@mui/material';

import usePermissions from 'hooks/permissions';
import {PermissionEnum} from 'constants/permissions';
import routes from 'constants/routes';
import {HeaderLogo} from 'components/icons';

import UserMenu from 'components/Common/Layout/Header/UserMenu';
import {useStyles} from './styles';

const isActiveFn = path => (match, location) => location.pathname.startsWith(path);

const Header = () => {
  const {hasPermissions} = usePermissions();
  const classes = useStyles();

  // TODO ADD filter navigation list

  return (
    <AppBar position="static">
      <Toolbar>
        <Link component={RouterLink} to="/" exact={true} activeClassName={classes.active}>
          <HeaderLogo sx={{fontSize: 90}} />
        </Link>

        <Box className={classes.navContent}>
          <Link component={RouterLink} to="/skills" exact={true} isActive={isActiveFn('/skills')}>
            Skills
          </Link>
          {hasPermissions([PermissionEnum.TAGS_LIST]) && (
            <Link
              component={RouterLink}
              to={routes.tags.list}
              exact={true}
              isActive={isActiveFn(routes.tags.list)}
            >
              Tags
            </Link>
          )}
          {/* <Link component={RouterLink} to="/employees" isActive={isActiveFn('/employees')}>
          Employees
        </Link> */}
        </Box>

        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
