# Permissions

In many Web Apps there are different user roles.
Instead of wrapping components, actions, and screens in specific user roles, we are using permission scopes to guard
different parts of the application. 

## Set user's permissions

When the user is fetched from the API, the user object should  set permissions list with a function from the permission component:

[//]: # ( TODO: Add set permissions after user's login based on they roles)

```jsx
import { setPermissions } from "src/components/Permission/";

// Get current user
//  TODO: Update it

const response = await axios.get("/users/me");
const user = response.data;

// Set user's permissions using dispatch
dispatch(setPermissions(user.attributes.permissions ?? []));
```

The Permission component will now have access to the user's permission scopes and can show/hide components.

## Guarding a feature

### Component

Let's say we have a screen where only administrators should be able to do some action (via Button). 
To solve this, we can wrap the button in the Permission component and pass in the specific permission scope 
that is required to this action, so if
the current user doesn't meet the requirement then the button will not be shown.

```jsx
import { Permission, PermissionEnum } from "src/components/Permission/";

const MyComponent = () => {
  return (
    <Permission requiredPermissions={[PermissionEnum.USERS_CREATE]}>
      <Button onClick={createUser}>Button title</Button>
    </Permission>
  );
};
```

### Hook

As an alternative, we can use the hook `usePermissions`, so we can disable the button, if that is the case:

```jsx
import {
  usePermissions,
  PermissionEnum,
} from "src/components/Permission/";

const MyComponent = () => {
  const { allowed } = usePermissions([PermissionEnum.USERS_CREATE]);

  return (
    <Button onClick={onClick} disabled={allowed}>
      Button title
    </Button>
  );
};
```

## Guarding a screen

[//]: # ( TODO: Add permissions for pages&#40;routes&#41;;)


Each screen can have an optional permissions prop, which holds a list of different permissions required to view that
screen.

```jsx
.....
```

### Fallback component

If the user doesn't have any of the required permissions, then a fallback component can be shown, for example that the
screen has restricted access:

```jsx
import { Permission } from "src/components/Permission/";

[//]: # ( TODO: Add fallback or redirect to 404)
    
<Permission
  requiredPermissions={homeScreen.permissions}
  fallback={<div>Restricted Access</div>}
>
  <HomeScreen />
</Permission>
```

### Redirect

We can also redirect the user to a different route when lacking the required permissions, for example to a "restricted
access" screen:

```jsx
import { Permission } from "src/components/Permission/";

<Permission
  requiredPermissions={homeScreen.permissions}
  redirectTo="/restricted-access"
>
  <HomeScreen />
</Permission>;
```
