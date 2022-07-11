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
    pathName: routes.tags.list,
    linkName: 'Tags',
    key: 'tags',
    permissions: [PermissionEnum.TAGS_LIST],
    exact: true
  },
  {
    pathName: routes.employees.list,
    linkName: 'Employees',
    key: 'employees',
    permissions: [PermissionEnum.USERS_LIST],
    exact: true
  }
];

export default navigationLinks;
