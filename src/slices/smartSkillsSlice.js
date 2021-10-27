import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import employees from '../mocks/employees.json';

export const smartSkillsApi = createApi({
  reducerPath: 'skills',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  keepUnusedDataFor: 30,
  endpoints(builder) {
    return {
      findSkills: builder.query({
        query: skillName => ({
          url: 'skills',
          headers: {
            find: skillName || 'all',
          },
        }),
      }),
      similarSkills: builder.query({
        query: ({ skillName, limit }) => ({
          url: 'skills',
          headers: {
            similar: skillName,
            ...(limit && { limit }),
          },
        }),
      }),
      neighborSkills: builder.query({
        query: ({ skillName, groups, limit = 500 }) => ({
          url: 'skills',
          headers: {
            neighbors: skillName,
            ...(limit && { limit }),
            ...(groups && { groups }),
          },
        }),
      }),
      fetchEmployees: builder.query({
        query: ({ ids, recommend, groups }) => ({
          url: 'employees',
          headers: {
            ids,
            ...(recommend && { recommend }),
            ...(groups && { groups }),
          },
        }),
        transformResponse: response => response.data,
      }),
      fetchEmployee: builder.query({
        query: ({ id }) => ({
          url: `employees/${id}`,
        }),
        transformResponse: response => response.data[0][0],
      }),
      fetchSkillGroups: builder.query({
        query: () => ({
          url: 'skill-groups',
        }),
        transformResponse: response => response.SkillGroups,
      }),
    };
  },
});

export const {
  useFindSkillsQuery,
  useSimilarSkillsQuery,
  useNeighborSkillsQuery,
  useFetchEmployeesQuery,
  useFetchEmployeeQuery,
  useFetchSkillGroupsQuery,
} = smartSkillsApi;
