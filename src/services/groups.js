import apiUrls from 'constants/apiURLs';

import api from './api';

const groupsApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchGroups: builder.query({
      query: params => ({
        url: apiUrls.groups.root,
        params
      }),
      providesTags: ['Groups'],
      transformResponse: response => ({...response, groups: response.data})
    }),
    fetchAutocompleteGroups: builder.query({
      query: params => ({
        url: apiUrls.groups.autocomplete,
        params
      }),
      providesTags: ['AutocompleteGroups'],
      transformResponse: response => response.data
    }),
    addGroup: builder.mutation({
      query: params => ({
        url: apiUrls.groups.root,
        method: 'POST',
        body: params
      }),
      invalidatesTags: ['Groups']
    }),
    updateGroup: builder.mutation({
      query: ({id, ...params}) => ({
        url: apiUrls.groups.details(id),
        method: 'PATCH',
        body: params
      })
    }),
    deleteGroup: builder.mutation({
      query: ({id}) => ({
        url: apiUrls.groups.details(id),
        method: 'DELETE'
      }),
      invalidatesTags: ['Groups']
    })
  })
});

export default groupsApi;
export const {
  useFetchGroupsQuery,
  useFetchAutocompleteGroupsQuery,
  useUpdateGroupMutation,
  useAddGroupMutation,
  useDeleteGroupMutation
} = groupsApi;

export const getGroups = {
  type: `${groupsApi.reducerPath}/invalidateGroups`,
  payload: ['Groups']
};
