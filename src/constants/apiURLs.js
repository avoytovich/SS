const apiUrls = {
  users: {
    root: '/users',
    roles: '/roles',
    rootWithQueries: query => `/users/?${query}`,
    details: id => `/users/${id}`,
    managementDetails: id => `/users/${id}/management`,
    myProfile: '/users/me',
    profileSkills: '/users/me/skills',
    profileSkillSet: '/users/me/skill-set',
    recommendedSkills: '/users/me/recommended/skills',
    management: '/users/management',
    autocomplete: 'users/autocomplete'
  },
  tags: {
    root: '/tags',
    rootWithQueries: query => `/tags/?${query}`,
    details: id => `/tags/${id}`,
    autocomplete: 'tags/autocomplete'
  },
  skills: {
    root: '/skills',
    mock: '/skills/mock',
    autocomplete: '/skills/autocomplete',
    requested: '/skill-requests',
    rootWithQueries: query => `/skills/?${query}`,
    details: id => `/skills/${id}`,
    rejectedSkill: id => `/skill-requests/${id}/reject`
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
    root: '/skill-requests',
    details: id => `/skill-requests/${id}`,
    approve: id => `/skill-requests/${id}/approve`,
    reject: id => `/skill-requests/${id}/reject`
  }
};

export default apiUrls;
