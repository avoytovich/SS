import apiUrls from 'constants/apiURLs';
import api from './api';

const senioritiesApi = api.injectEndpoints({
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
