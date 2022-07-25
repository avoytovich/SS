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
    })
  })
});

export default skillRequestsApi;

export const {useAddSkillRequestsMutation} = skillRequestsApi;
