import {createApi} from '@reduxjs/toolkit/query/react';
import {apiUrls} from 'constants/apiURLs';
import {baseQuery} from 'utils/getBaseQuery';

const employeesApi = createApi({
  baseQuery,
  reducerPath: 'employeesApi',
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
