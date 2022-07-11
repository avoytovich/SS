import apiUrls from 'constants/apiURLs';
import api from './api';

const specializationsApi = api.injectEndpoints({
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
