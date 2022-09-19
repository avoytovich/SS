import routes from './routes';
import {PermissionEnum} from './permissions';

const navigationLinks = [
  {
    pathName: routes.skills.list,
    linkName: 'Skills',
    key: 'skills',
    permissions: [PermissionEnum.SKILLS_LIST],
    exact: true
  },
  {
    pathName: routes.groups.list,
    linkName: 'Groups',
    key: 'groups',
    permissions: [PermissionEnum.GROUPS_LIST],
    exact: true
  },
  {
    pathName: routes.employees.list,
    linkName: 'Employees',
    key: 'employees',
    permissions: [PermissionEnum.USERS_LIST],
    exact: true
  },
  {
    pathName: routes.users.list,
    linkName: 'Users',
    key: 'users',
    permissions: [PermissionEnum.USERS_MANAGMENT_LIST],
    exact: true
  }
];

export default navigationLinks;
