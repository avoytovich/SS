import {apiUrls} from 'constants/apiURLs';
import {baseQuery} from 'utils/getBaseQuery';
import {createApi} from '@reduxjs/toolkit/dist/query/react';

const profileApi = createApi({
  baseQuery,
  reducerPath: 'Profile',
  endpoints: builder => ({
    getUserProfile: builder.query({
      query: () => ({
        url: apiUrls.users.myProfile,
        method: 'get',
        params: {
          role: 'SuperAdmin'
        }
      })
    }),
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
export const {useFetchSkillsQuery, useGetUserProfileQuery} = profileApi;
