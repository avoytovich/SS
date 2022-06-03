import {UserRoleEnum} from './userRoles';

/**
 * All permission scopes.
 * The scopes shall be aligned with backend
 */
export const PermissionEnum = {
  // Tags page (admin page)

  TAGS_CREATE: 'app.tags.create',
  TAGS_DELETE: 'app.tags.delete',
  TAGS_EDIT: 'app.tags.edit',
  TAGS_LIST: 'app.tags.list',
  TAGS_DETAILS: 'app.tags.read',

  // Skills page (admin page)

  SKILLS_CREATE: 'app.skills.create',
  SKILLS_DELETE: 'app.skills.delete',
  SKILLS_EDIT: 'app.skills.edit',
  SKILLS_LIST: 'app.skills.list',
  SKILLS_DETAILS: 'app.skills.read',

  // Employee list
  USERS_EDIT: 'app.users.edit',
  USERS_LIST: 'app.users.list',
  USERS_READ: 'app.users.read',
  USERS_DETAILS: 'app.users.details',

  // My profile
  USERS_ME: 'app.users.me',

  // My profile skillset

  SKILLSSET_CREATE: 'app.skillsset.create',
  SKILLSSET_DELETE: 'app.skillsset.delete',
  SKILLSSET_EDIT: 'app.skillsset.edit',
  SKILLSSET_LIST: 'app.skillsset.list',
  SKILLSSET_DETAILS: 'app.skillsset.details',

  // User managment (role permissions)
  USERS_MANAGMENT_EDIT: 'app.usersmanagment.edit',
  USERS_MANAGMENT_LIST: 'app.usersmanagment.list',
  USERS_MANAGMENT_CREATE: 'app.usersmanagment.create',
  USERS_MANAGMENT_DELETE: 'app.usersmanagment.delete'
};

export const USER_ROLES_PERMISSIONS = {
  [UserRoleEnum.GUEST]: [],
  [UserRoleEnum.SUPER_ADMIN]: [
    PermissionEnum.TAGS_CREATE,
    PermissionEnum.TAGS_DELETE,
    PermissionEnum.TAGS_EDIT,
    PermissionEnum.TAGS_LIST,
    PermissionEnum.TAGS_DETAILS,
    PermissionEnum.SKILLS_CREATE,
    PermissionEnum.SKILLS_DELETE,
    PermissionEnum.SKILLS_EDIT,
    PermissionEnum.SKILLS_LIST,
    PermissionEnum.SKILLS_DETAILS,
    PermissionEnum.SKILLSSET_LIST,
    PermissionEnum.SKILLSSET_CREATE,
    PermissionEnum.SKILLSSET_DELETE,
    PermissionEnum.SKILLSSET_EDIT,
    PermissionEnum.SKILLSSET_DETAILS,
    PermissionEnum.USERS_ME,
    PermissionEnum.USERS_LIST,
    PermissionEnum.USERS_DETAILS
  ],
  [UserRoleEnum.MODERATOR]: [
    PermissionEnum.TAGS_CREATE,
    PermissionEnum.TAGS_DELETE,
    PermissionEnum.TAGS_EDIT,
    PermissionEnum.TAGS_LIST,
    PermissionEnum.TAGS_DETAILS,
    PermissionEnum.SKILLS_CREATE,
    PermissionEnum.SKILLS_DELETE,
    PermissionEnum.SKILLS_EDIT,
    PermissionEnum.SKILLS_LIST,
    PermissionEnum.SKILLS_DETAILS,
    PermissionEnum.SKILLSSET_LIST,
    PermissionEnum.SKILLSSET_CREATE,
    PermissionEnum.SKILLSSET_DELETE,
    PermissionEnum.SKILLSSET_EDIT,
    PermissionEnum.SKILLSSET_DETAILS,
    PermissionEnum.USERS_ME,
    PermissionEnum.USERS_LIST,
    PermissionEnum.USERS_DETAILS
  ],
  [UserRoleEnum.MANAGER]: [
    PermissionEnum.SKILLS_LIST,
    PermissionEnum.SKILLS_DETAILS,
    PermissionEnum.TAGS_LIST,
    PermissionEnum.SKILLSSET_LIST,
    PermissionEnum.SKILLSSET_CREATE,
    PermissionEnum.SKILLSSET_DELETE,
    PermissionEnum.SKILLSSET_EDIT,
    PermissionEnum.SKILLSSET_DETAILS,
    PermissionEnum.USERS_LIST,
    PermissionEnum.USERS_DETAILS,
    PermissionEnum.USERS_ME
  ],
  [UserRoleEnum.EMPLOYEE]: [
    PermissionEnum.SKILLSSET_LIST,
    PermissionEnum.SKILLSSET_CREATE,
    PermissionEnum.SKILLSSET_DELETE,
    PermissionEnum.SKILLSSET_EDIT,
    PermissionEnum.SKILLSSET_DETAILS,
    PermissionEnum.USERS_ME
  ]
};
