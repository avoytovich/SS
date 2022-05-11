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
      query: ({page}) => ({
        url: apiUrls.tagList,
        params: {page}
      }),
      transformResponse: response => ({...response, tags: response.data})
    })
  })
});

export default tagsApi;
export const {useFetchTagsQuery} = tagsApi;
