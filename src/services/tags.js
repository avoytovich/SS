import apiUrls from 'constants/apiURLs';

import api from './api';

const tagsApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchTags: builder.query({
      query: params => ({
        url: apiUrls.tags.root,
        params
      }),
      providesTags: ['Tags'],
      transformResponse: response => ({...response, tags: response.data})
    }),
    addTag: builder.mutation({
      query: params => ({
        url: apiUrls.tags.root,
        method: 'POST',
        body: params
      })
    }),
    updateTag: builder.mutation({
      query: ({id, ...params}) => ({
        url: apiUrls.tags.details(id),
        method: 'PATCH',
        body: params
      })
    }),
    deleteTag: builder.mutation({
      query: ({id}) => ({
        url: apiUrls.tags.details(id),
        method: 'DELETE'
      }),
      invalidatesTags: ['Tags']
    })
  })
});

export default tagsApi;
export const {useFetchTagsQuery, useUpdateTagMutation, useAddTagMutation, useDeleteTagMutation} =
  tagsApi;

export const getTags = {
  type: `${tagsApi.reducerPath}/invalidateTags`,
  payload: ['Tags']
};
