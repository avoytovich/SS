export const UserRoleEnum = {
  GUEST: 'guest',
  ADMIN: 'Admin',
  MODERATOR: 'Moderator',
  MANAGER: 'Manager',
  EMPLOYEE: 'Employee'
};

const userRoles = {
  [UserRoleEnum.ADMIN]: {
    id: 'Admin',
    label: 'Admin',
    role: UserRoleEnum.ADMIN
  },
  [UserRoleEnum.MODERATOR]: {id: 'Moderator', label: 'Moderator', role: UserRoleEnum.MODERATOR},
  [UserRoleEnum.MANAGER]: {id: 'Manager', label: 'Manager', role: UserRoleEnum.MANAGER},
  [UserRoleEnum.EMPLOYEE]: {id: 'Employee', label: 'Employee', role: UserRoleEnum.EMPLOYEE}
};

export default userRoles;
