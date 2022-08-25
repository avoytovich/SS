import apiUrls from 'constants/apiURLs';

import api from './api';

const skillRequestsApi = api.injectEndpoints({
  endpoints: builder => ({
    addSkillRequests: builder.mutation({
      query: (body, params) => ({
        url: apiUrls.skillRequests.root,
        method: 'POST',
        body,
        params
      })
    }),
    fetchSkillRequest: builder.query({
      query: ({id, ...params}) => ({
        url: apiUrls.skillRequests.details(id),
        method: 'GET',
        params
      }),
      providesTags: (result, error, id) => [{type: 'RequestedSkills', id}]
    })
  })
});

export default skillRequestsApi;

export const {useAddSkillRequestsMutation, useFetchSkillRequestQuery} = skillRequestsApi;
