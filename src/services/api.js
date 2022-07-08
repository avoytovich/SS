import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL_PREFIXES} from 'constants/apiUrlPrefixes';

const {PREFIX_BASE_URL} = API_URL_PREFIXES;

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: `${PREFIX_BASE_URL}`}),
  tagTypes: [
    'Competencies',
    'Profile',
    'Employees',
    'Seniorities',
    'SkillRequests',
    'Skills',
    'Specializations',
    'Tags'
  ],
  endpoints: () => ({})
});

export default api;
