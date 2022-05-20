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
        url: apiUrls.tags.list,
        params: {...params}
      }),
      providesTags: ['Tags'],
      transformResponse: response => ({...response, tags: response.data})
    }),
    addTag: builder.mutation({
      query: ({body}) => ({
        url: apiUrls.tags.list,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Tags']
    }),
    updateTag: builder.mutation({
      query: ({id, body}) => ({
        url: apiUrls.tags.modify(id),
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['Tags']
    }),
    deleteTag: builder.mutation({
      query: ({id}) => ({
        url: apiUrls.tags.modify(id),
        method: 'DELETE'
      }),
      invalidatesTags: ['Tags']
    })
  })
});

export default tagsApi;
export const {useFetchTagsQuery, useUpdateTagMutation, useAddTagMutation, useDeleteTagMutation} =
  tagsApi;
