import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrls} from 'constants/apiURLs';
import {API_URL_PREFIXES} from 'constants/apiUrlPrefixes';

const skillsApi = createApi({
  reducerPath: 'skillsApi',
  baseQuery: fetchBaseQuery({baseUrl: `${API_URL_PREFIXES.PREFIX_BASE_URL}`}),
  tagTypes: ['Skills'],

  endpoints: builder => ({
    fetchSkills: builder.query({
      query: queryOptions => ({
        url: apiUrls.skills.root,
        method: 'get',
        params: queryOptions
      }),

      transformResponse: response => ({...response, skills: response.data})
    }),

    addSkill: builder.query({
      query: queryOptions => ({
        url: apiUrls.skills.root,
        method: 'post',
        params: queryOptions
      })
    }),

    deleteSkill: builder.query({
      query: queryOptions => ({
        url: apiUrls.skills.root,
        method: 'delete',
        params: queryOptions
      })
    })
  })
});

export default skillsApi;

export const {useFetchSkillsQuery, useAddSkillQuery, useDeleteSkillQuery} = skillsApi;
