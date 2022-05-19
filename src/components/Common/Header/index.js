import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import {NavLink as RouterLink} from 'react-router-dom';

import usePermissions from 'hooks/permissions';
import {PermissionEnum} from '../../../constants/permissions';
import UserMenu from './UserMenu';
import routes from '../../../constants/routes';

const isActiveFn = path => (match, location) => location.pathname.startsWith(path);

const Header = () => {
  const {hasPermissions} = usePermissions();

  // TODO ADD filter navigation list

  return (
    <AppBar position="static">
      <Toolbar>
        <Link component={RouterLink} to="/" exact={true}>
          Welcome
        </Link>
        <Link component={RouterLink} to="/skills" exact={true} isActive={isActiveFn('/skills')}>
          Skills
        </Link>
        <Link component={RouterLink} to="/employees" isActive={isActiveFn('/employees')}>
          Employees
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
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
