import apiUrls from 'constants/apiURLs';

import api from './api';

const profileApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchUserProfile: builder.query({
      query: () => ({
        url: apiUrls.users.myProfile,
        method: 'GET',
        params: {
          role: 'Admin'
        }
      }),
      providesTags: ['Profile']
    }),
    fetchProfileSkills: builder.query({
      query: ({...params}) => ({
        url: apiUrls.users.profileSkills,
        params: {...params}
      }),
      providesTags: ['ProfileSkills'],
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

export const {
  useFetchUserProfileQuery,
  useFetchProfileSkillsQuery,
  useFetchRecommendedSkillsQuery
} = profileApi;
