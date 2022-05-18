import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import {NavLink as RouterLink} from 'react-router-dom';

import UserMenu from 'components/UserMenu';

const isActiveFn = path => (match, location) => location.pathname.startsWith(path);

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Link component={RouterLink} to="/" exact={true}>
        Welcome
      </Link>
      <Link component={RouterLink} to="/skills" exact={true} isActive={isActiveFn('/skills')}>
        Skills
      </Link>
      <Link component={RouterLink} to="/tags" isActive={isActiveFn('/tags')}>
        Tags
      </Link>
      <Link component={RouterLink} to="/employees" isActive={isActiveFn('/employees')}>
        Employees
      </Link>
      <UserMenu />
    </Toolbar>
  </AppBar>
);

export default Header;
