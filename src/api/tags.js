import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrls} from 'constants/apiURLs';
import {API_URL_PREFIXES} from 'constants/apiUrlPrefixes';

const {PREFIX_BASE_URL} = API_URL_PREFIXES;

const tagsApi = createApi({
  reducerPath: 'tagsApi',
  baseQuery: fetchBaseQuery({baseUrl: `${PREFIX_BASE_URL}`}),
  tagTypes: ['Tags'],
  endpoints: builder => ({
    fetchTags: builder.query({
      query: ({...params}) => ({
        url: apiUrls.tags.root,
        params: {...params}
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
