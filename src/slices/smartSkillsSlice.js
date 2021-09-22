import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const smartSkillsApi = createApi({
  reducerPath: 'skills',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints(builder) {
    return {
      findSkills: builder.query({
        query: skillName => ({
          url: 'skills/',
          method: 'POST',
          body: {
            find: skillName || 'all',
          },
        }),
      }),
      similarSkills: builder.query({
        query: ({ skillName, limit }) => ({
          url: 'skills/',
          method: 'POST',
          body: {
            similar: skillName,
            ...(limit && { limit }),
          },
        }),
      }),
      neighborSkills: builder.query({
        query: ({ skillName, groups, limit }) => ({
          url: 'skills/',
          method: 'POST',
          body: {
            neighbors: skillName,
            ...(limit && { limit }),
            ...(groups && { groups }),
          },
        }),
      }),
      fetchEmployees: builder.query({
        query: ({ ids, recommend }) => ({
          url: 'employees/',
          method: 'POST',
          body: {
            ids,
            ...(recommend && { recommend }),
          },
        }),
      }),
    };
  },
});

export const {
  useFindSkillsQuery,
  useSimilarSkillsQuery,
  useNeighborSkillsQuery,
  useFetchEmployeesQuery,
} = smartSkillsApi;
