import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrls} from 'constants/apiURLs';
import {API_URL_PREFIXES} from 'constants/apiUrlPrefixes';

const skillRequestsApi = createApi({
  reducerPath: 'skillRequestsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL_PREFIXES.PREFIX_BASE_URL}`
  }),
  tagTypes: ['SkillRequests'],

  endpoints: builder => ({
    addSkillRequests: builder.mutation({
      query: ({role, ...params}) => ({
        url: apiUrls.skillRequests.root,
        method: 'POST',
        params: {role},
        body: params
      })
    })
  })
});

export default skillRequestsApi;

export const {useAddSkillRequestsMutation} = skillRequestsApi;
