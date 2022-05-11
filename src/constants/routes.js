const routes = {
  home: '/',
  login: '/login',
  tags: {
    list: '/tags'
  },
  skills: {
    list: '/skills'
  },
  employees: {
    list: 'employees',
    details: {
      path: '/employees/:id',
      link: id => `/employees/${id}`
    }
  },
  roles: {
    list: '/roles'
  }
};

export default routes;
