import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import neighborSkills from '../mocks/neighborsSkills';
import employees from '../mocks/employees.json';
import findSkills from '../mocks/findSkills';

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
          url: 'skills/',
          method: 'POST',
          body: {
            find: skillName || 'all',
          },
        }),
        transformResponse: () => findSkills,
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
        // TODO: replace mocked data with real one
        transformResponse: () => neighborSkills,
      }),
      fetchEmployees: builder.query({
        query: ({ ids, recommend, groups }) => ({
          url: 'employees/',
          method: 'POST',
          body: {
            ids,
            ...(recommend && { recommend }),
            ...(groups && { groups }),
          },
        }),
        // TODO: replace mocked data with real one
        transformResponse: () => employees,
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
