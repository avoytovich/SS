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

export const loginRequest = {
  scopes: [
    'openid',
    'profile',
    'User.Read',
    'User.ReadBasic.All',
    'email'
    // `api://${process.env.REACT_APP_MSAL_CLIENT_ID}/access_as_user`
  ]
};
