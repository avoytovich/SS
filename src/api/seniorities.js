import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrls} from 'constants/apiURLs';
import {API_URL_PREFIXES} from 'constants/apiUrlPrefixes';

const {PREFIX_BASE_URL} = API_URL_PREFIXES;

const senioritiesApi = createApi({
  reducerPath: 'senioritiesApi',
  baseQuery: fetchBaseQuery({baseUrl: `${PREFIX_BASE_URL}`}),
  tagTypes: ['Seniorities'],
  endpoints: builder => ({
    fetchSeniorities: builder.query({
      query: ({...params}) => ({
        url: apiUrls.seniorities.root,
        params: {...params}
      }),
      providesTags: ['Seniorities'],
      transformResponse: response => ({...response, seniorities: response.data})
    })
  })
});

export default senioritiesApi;
export const {useFetchSenioritiesQuery} = senioritiesApi;
