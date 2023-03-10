import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {API_URL_PREFIXES} from 'constants/apiUrlPrefixes';

import Session from '../utils/session';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL_PREFIXES.PREFIX_BASE_URL,
    prepareHeaders: headers => {
      const token = process.env.REACT_APP_MSAL_DISABLE !== 'true' ? Session.get() : 'fake-token';
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: [
    'Competencies',
    'Profile',
    'Employees',
    'Seniorities',
    'SkillRequests',
    'Skills',
    'Specializations',
    'Groups',
    'RecommendedSkills',
    'AutocompleteSkills',
    'ProfileSkills',
    'UserRoles',
    'UserManagements',
    'UsersAutocomplete',
    'AutocompleteGroups',
    'RequestedSkills'
  ],
  endpoints: () => ({})
});

export default api;
