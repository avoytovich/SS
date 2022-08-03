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
    fetchUsersAutocomplete: builder.query({
      query: params => ({
        url: apiUrls.users.autocomplete,
        params
      }),
      providesTags: ['UsersAutocomplete'],
      transformResponse: response => response.data
    }),
    fetchUserRoles: builder.query({
      query: params => ({
        url: apiUrls.users.roles,
        params
      }),
      providesTags: ['UserRoles'],
      transformResponse: response => response.data
    }),
    setUserRole: builder.mutation({
      query: ({id, ...params}) => ({
        url: apiUrls.users.managementDetails(id),
        method: 'PATCH',
        body: params
      }),
      invalidatesTags: [{type: 'UserManagements', role: 'LIST'}]
    })
  })
});

export default usersApi;
export const {
  useFetchUserRolesQuery,
  useFetchManagementsQuery,
  useLazyFetchManagementsQuery,
  useFetchUsersAutocompleteQuery,
  useSetUserRoleMutation
} = usersApi;
