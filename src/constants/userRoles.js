export const UserRoleEnum = {
  GUEST: 'guest',
  SUPER_ADMIN: 'SuperAdmin',
  MODERATOR: 'Moderator',
  MANAGER: 'Manager',
  EMPLOYEE: 'Employee'
};

const userRoles = {
  [UserRoleEnum.SUPER_ADMIN]: {
    id: 'SuperAdmin',
    label: 'Super Admin',
    role: UserRoleEnum.SUPER_ADMIN
  },
  [UserRoleEnum.MODERATOR]: {id: 'Moderator', label: 'Moderator', role: UserRoleEnum.MODERATOR},
  [UserRoleEnum.MANAGER]: {id: 'Manager', label: 'Manager', role: UserRoleEnum.MANAGER},
  [UserRoleEnum.EMPLOYEE]: {id: 'Employee', label: 'Employee', role: UserRoleEnum.EMPLOYEE}
};

export default userRoles;
