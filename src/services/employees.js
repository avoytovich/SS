import {apiUrls} from 'constants/apiURLs';
import api from './api';

const employeesApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchEmployees: builder.query({
      query: ({...params}) => ({
        url: apiUrls.users.root,
        params: {...params}
      }),
      providesTags: ['Employees'],
      transformResponse: response => ({...response, employees: response.data})
    })
  })
});

export default employeesApi;
export const {useFetchEmployeesQuery} = employeesApi;
