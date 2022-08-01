const apiUrls = {
  users: {
    root: '/users',
    rootWithQueries: query => `/users/?${query}`,
    details: id => `/users/${id}`,
    myProfile: '/users/me',
    profileSkills: '/users/me/skills',
    profileSkillSet: '/users/me/skill-set',
    recommendedSkills: '/users/me/recommended/skills'
  },
  tags: {
    root: '/tags',
    rootWithQueries: query => `/tags/?${query}`,
    details: id => `/tags/${id}`
  },
  skills: {
    root: '/skills',
    mock: '/skills/mock',
    autocomplete: '/skills/autocomplete',
    rootWithQueries: query => `/skills/?${query}`,
    details: id => `/skills/${id}`
  },
  competencies: {
    root: '/competencies'
  },
  specializations: {
    root: '/specializations'
  },
  seniorities: {
    root: '/seniorities'
  },
  skillRequests: {
    root: '/skill-requests'
  }
};

export default apiUrls;
