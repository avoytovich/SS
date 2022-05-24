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
        url: apiUrls.skills.mock,
        method: 'get',
        params: queryOptions
      }),

      transformResponse: response => ({...response, skills: response.data})
    })
  })
});

export default skillsApi;

export const {useFetchSkillsQuery} = skillsApi;
