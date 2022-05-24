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
      query: ({name}) => ({
        url: apiUrls.tags.root,
        method: 'POST',
        body: name
      }),
      invalidatesTags: ['Tags']
    }),
    updateTag: builder.mutation({
      query: ({id, name}) => ({
        url: apiUrls.tags.details(id),
        method: 'PATCH',
        body: name
      }),
      invalidatesTags: ['Tags']
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
