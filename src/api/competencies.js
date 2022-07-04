import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrls} from 'constants/apiURLs';
import {API_URL_PREFIXES} from 'constants/apiUrlPrefixes';

const {PREFIX_BASE_URL} = API_URL_PREFIXES;

const competenciesApi = createApi({
  reducerPath: 'competenciesApi',
  baseQuery: fetchBaseQuery({baseUrl: `${PREFIX_BASE_URL}`}),
  tagTypes: ['Competencies'],
  endpoints: builder => ({
    fetchCompetencies: builder.query({
      query: ({...params}) => ({
        url: apiUrls.competencies.root,
        params: {...params}
      }),
      providesTags: ['Competencies'],
      transformResponse: response => ({...response, competencies: response.data})
    })
  })
});

export default competenciesApi;
export const {useFetchCompetenciesQuery} = competenciesApi;
