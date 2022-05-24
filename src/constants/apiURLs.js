export const apiUrls = {
  users: {
    root: '/users',
    rootWithQueries: query => `/users/?${query}`,
    details: id => `/users/${id}`,
    myProfile: '/users/me'
  },
  tags: {
    root: '/tags',
    rootWithQueries: query => `/tags/?${query}`,
    details: id => `/tags/${id}`
  },
  skills: {
    root: '/skills',
    mock: '/skills/mock',
    rootWithQueries: query => `/skills/?${query}`,
    details: id => `/skills/${id}`
  }
};
