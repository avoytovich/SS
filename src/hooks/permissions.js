import {useSelector} from 'react-redux';

const usePermissions = () => {
  const {permissions} = useSelector(state => state.permissions);

  const hasPermissions = (requiredPermissions, hasAll) => {
    let hasPermission = false;

    if (permissions && permissions.length > 0) {
      if (hasAll) {
        hasPermission = requiredPermissions.every(permission => permissions.includes(permission));
      } else {
        hasPermission = requiredPermissions.some(permission => permissions.includes(permission));
      }
      return hasPermission;
    }
    // eslint-disable-next-line no-console
    console.warn(
      'No permissions detected. Did you remember to use setPermissions() to set the permissions?'
    );
    return hasPermission;
  };

  return {hasPermissions};
};

export default usePermissions;
