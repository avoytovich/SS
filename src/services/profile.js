import apiUrls from 'constants/apiURLs';

import api from './api';

const profileApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchUserProfile: builder.query({
      query: params => ({
        url: apiUrls.users.myProfile,
        method: 'GET',
        params
      }),
      providesTags: ['Profile']
    }),
    fetchProfileSkills: builder.query({
      query: params => ({
        url: apiUrls.users.profileSkills,
        method: 'GET',
        params
      }),
      providesTags: ['ProfileSkills'],
      transformResponse: response => ({...response, skills: response.data})
    }),
    fetchRecommendedSkills: builder.query({
      query: params => ({
        url: apiUrls.users.recommendedSkills,
        method: 'GET',
        params
      }),
      providesTags: ['RecommendedSkills'],
      transformResponse: response => ({...response, skills: response.data})
    })
  })
});

export default profileApi;

export const {
  useFetchUserProfileQuery,
  useFetchProfileSkillsQuery,
  useFetchRecommendedSkillsQuery
} = profileApi;
