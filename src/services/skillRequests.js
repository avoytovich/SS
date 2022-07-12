import apiUrls from 'constants/apiURLs';

import api from './api';

const skillRequestsApi = api.injectEndpoints({
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
