import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrls} from 'constants/apiURLs';
import {API_URL_PREFIXES} from 'constants/apiUrlPrefixes';

const {PREFIX_BASE_URL} = API_URL_PREFIXES;

const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({baseUrl: `${PREFIX_BASE_URL}`}),
  tagTypes: ['Profile'],
  endpoints: builder => ({
    fetchSkills: builder.query({
      query: ({...params}) => ({
        url: apiUrls.users.profileSkills,
        params: {...params}
      }),
      providesTags: ['Profile'],
      transformResponse: response => ({...response, skills: response.data})
    })
  })
});

export default profileApi;
export const {useFetchSkillsQuery} = profileApi;
