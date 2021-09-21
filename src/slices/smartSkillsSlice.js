import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const smartSkillsApi = createApi({
  reducerPath: 'skills',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  endpoints(builder) {
    return {
      findSkills: builder.query({
        query: skill => ({
          url: 'skills/',
          method: 'POST',
          body: {
            find: skill || 'all',
          },
        }),
      }),
      similarSkills: builder.query({
        query: (similar, limit) => ({
          url: 'skills/',
          method: 'POST',
          body: {
            similar,
            ...(limit && { limit }),
          },
        }),
      }),
      neighborSkills: builder.query({
        query: (neighbors, limit, groups) => ({
          url: 'skills/',
          method: 'POST',
          body: {
            neighbors,
            ...(limit && { limit }),
            ...(groups && { groups }),
          },
        }),
      }),
      fetchEmployees: builder.query({
        query: (ids, recommend) => ({
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
