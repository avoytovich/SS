import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrls} from 'constants/apiURLs';
import {API_URL_PREFIXES} from 'constants/apiUrlPrefixes';

const {PREFIX_BASE_URL} = API_URL_PREFIXES;

const specializationsApi = createApi({
  reducerPath: 'specializationsApi',
  baseQuery: fetchBaseQuery({baseUrl: `${PREFIX_BASE_URL}`}),
  tagTypes: ['Specializations'],
  endpoints: builder => ({
    fetchSpecializations: builder.query({
      query: ({...params}) => ({
        url: apiUrls.specializations.root,
        params: {...params}
      }),
      providesTags: ['Specializations'],
      transformResponse: response => ({...response, specializations: response.data})
    })
  })
});

export default specializationsApi;
export const {useFetchSpecializationsQuery} = specializationsApi;
