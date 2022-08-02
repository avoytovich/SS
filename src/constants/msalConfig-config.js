export const MSAL_CONFIG = {
  auth: {
    clientId: process.env.REACT_APP_MSAL_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_MSAL_TENANT_ID}`,
    redirectUri: window.location.origin
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: true // Set this to 'true' if you are having issues on IE11 or Edge
  }
};

// export const loginScope = {
//   scopes: [
//     'openid',
//     'User.Read',
//     'profile',
//     'offline_access',
//     `api://${process.env.REACT_APP_MSAL_CLIENT_ID}/access_as_user`
//   ]
// };

export const loginScope = {
  scopes: ['openid', 'profile', 'user.read', 'user.readbasic.all', 'email']
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
  graphMePhotoEndpoint: 'https://graph.microsoft.com/v1.0/me/photos/48x48/$value'
};
