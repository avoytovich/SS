const routes = {
  home: '/',
  login: '/login',
  profile: '/profile',
  skillSet: '/skill-set',
  tags: {
    list: '/tags'
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
  errors: {
    pageNotFound: '/page-not-found',
    accessDenied: '/access-denied',
    serverError: '/server-error'
  }
};

export default routes;
