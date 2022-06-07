import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrls} from 'constants/apiURLs';
import {API_URL_PREFIXES} from 'constants/apiUrlPrefixes';

const {PREFIX_BASE_URL} = API_URL_PREFIXES;

const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: fetchBaseQuery({baseUrl: `${PREFIX_BASE_URL}`}),
  tagTypes: ['Employees'],
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
