import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrls} from 'constants/apiURLs';
import {API_URL_PREFIXES} from 'constants/apiUrlPrefixes';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: `${API_URL_PREFIXES.PREFIX_BASE_URL}`}),
  endpoints: builder => ({
    signinUser: builder.mutation({
      query: ({role}) => ({
        url: apiUrls.users.myProfile,
        method: 'get',
        params: {role}
      })
    })
  })
});

export default authApi;

export const {useSigninUserMutation} = authApi;
