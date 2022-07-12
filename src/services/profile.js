import apiUrls from 'constants/apiURLs';

import api from './api';

const profileApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchUserProfile: builder.query({
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
    }),
    fetchRecommendedSkills: builder.query({
      query: ({...params}) => ({
        url: apiUrls.users.recommendedSkills,
        params: {...params}
      }),
      providesTags: ['RecommendedSkills'],
      transformResponse: response => ({...response, skills: response.data})
    })
  })
});

export default profileApi;

export const {useFetchUserProfileQuery, useFetchSkillsQuery, useFetchRecommendedSkillsQuery} =
  profileApi;
