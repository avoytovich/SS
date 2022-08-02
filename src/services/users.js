import apiUrls from 'constants/apiURLs';

import api from './api';

const usersApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchManagements: builder.query({
      query: params => ({
        url: apiUrls.users.management,
        params
      }),
      providesTags: ['UserManagements'],
      transformResponse: response => response.data
    }),
    fetchUserRoles: builder.query({
      query: params => ({
        url: apiUrls.users.roles,
        params
      }),
      providesTags: ['UserRoles'],
      transformResponse: response => response.data
    })
  })
});

export default usersApi;
export const {useFetchUserRolesQuery, useFetchManagementsQuery} = usersApi;
