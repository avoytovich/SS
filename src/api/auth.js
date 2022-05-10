import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrls } from 'constants/apiURLs';
import { API_URL_PREFIXES } from 'constants/apiUrlPrefixes';

const { PREFIX_BASE_URL, PREFIX_API_VERSION } = API_URL_PREFIXES;

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${PREFIX_BASE_URL}${PREFIX_API_VERSION}` }),
  endpoints: builder => ({
    signinUser: builder.mutation({
      query: ({ role }) => ({
        url: apiUrls.userProfile,
        method: 'get',
        params: { role },
      }),
    }),
  }),
});

export default authApi;
export const { useSigninUserMutation } = authApi;
