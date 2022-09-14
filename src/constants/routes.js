const routes = {
  home: '/',
  login: '/login',
  profile: '/profile',
  skillSet: '/skill-set',
  groups: {
    list: '/groups'
  },
  skills: {
    list: '/skills',
    details: {
      path: '/skills/:id',
      link: id => `/skills/${id}`
    }
  },
  employees: {
    list: '/employees',
    details: {
      path: '/employees/:id',
      link: id => `/employees/${id}`
    }
  },
  roles: {
    list: '/roles'
  },
  users: {
    list: '/users'
  },
  errors: {
    pageNotFound: '/page-not-found',
    accessDenied: '/access-denied',
    serverError: '/server-error'
  }
};

export default routes;
