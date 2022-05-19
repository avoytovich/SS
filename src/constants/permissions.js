import {UserRoleEnum} from './userRoles';
/**
 * All permission scopes.
 * The scopes shall be aligned with backend
 */
export const PermissionEnum = {
  TAGS_CREATE: 'app.tags.create',
  TAGS_DELETE: 'app.tags.delete',
  TAGS_EDIT: 'app.tags.edit',
  TAGS_LIST: 'app.tags.list',
  TAGS_READ: 'app.tags.read',
  SKILLS_CREATE: 'app.skills.create',
  SKILLS_DELETE: 'app.skills.delete',
  SKILLS_EDIT: 'app.skills.edit',
  SKILLS_LIST: 'app.skills.list',
  SKILLS_READ: 'app.skills.read',

  // SKILLSSET_CREATE: 'app.skillsset.create',
  // SKILLSSET_DELETE: 'app.skillsset.delete',
  // SKILLSSET_EDIT: 'app.skillsset.edit',
  // SKILLSSET_LIST: 'app.skillsset.list',
  // SKILLSSET_READ: 'app.skillsset.read',

  USERS_EDIT: 'app.users.edit',
  USERS_EDIT_ME: 'app.users.edit.me',
  USERS_LIST: 'app.users.list',
  USERS_READ: 'app.users.read',
  USERS_READ_ME: 'app.users.read.me'
};

export const USER_ROLES_PERMISSIONS = {
  [UserRoleEnum.GUEST]: [],
  [UserRoleEnum.SUPER_ADMIN]: [
    PermissionEnum.TAGS_CREATE,
    PermissionEnum.TAGS_DELETE,
    PermissionEnum.TAGS_EDIT,
    PermissionEnum.TAGS_LIST,
    PermissionEnum.TAGS_READ
  ],
  [UserRoleEnum.MODERATOR]: [
    PermissionEnum.TAGS_CREATE,
    PermissionEnum.TAGS_DELETE,
    PermissionEnum.TAGS_EDIT,
    PermissionEnum.TAGS_LIST,
    PermissionEnum.TAGS_READ
  ],
  [UserRoleEnum.MANAGER]: [],
  [UserRoleEnum.EMPLOYEE]: []
};
