import {apiUrls} from 'constants/apiURLs';
import api from './api';

const competenciesApi = api.injectEndpoints({
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
