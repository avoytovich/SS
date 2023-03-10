import apiUrls from 'constants/apiURLs';

import api from './api';

const skillsApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchSkills: builder.query({
      query: params => ({
        url: apiUrls.skills.root,
        method: 'GET',
        params
      }),
      providesTags: ['Skills'],
      transformResponse: response => ({...response, skills: response.data})
    }),
    fetchAutocompleteSkills: builder.query({
      query: params => ({
        url: apiUrls.skills.autocomplete,
        method: 'GET',
        params
      }),
      providesTags: ['AutocompleteSkills'],
      transformResponse: response => response.data
    }),

    // TODO: move fetchRequestedSkills to skillsRequested.js
    fetchRequestedSkills: builder.query({
      query: params => ({
        url: apiUrls.skills.requested,
        method: 'GET',
        params
      }),
      providesTags: ['RequestedSkills']
    }),

    addSkill: builder.mutation({
      query: ({...params}) => ({
        url: apiUrls.skills.root,
        method: 'POST',
        body: params
      }),
      invalidatesTags: ['Skills']
    }),

    updateSkill: builder.mutation({
      query: ({id, ...params}) => ({
        url: apiUrls.skills.details(id),
        method: 'PATCH',
        body: params
      })
    }),

    deleteSkill: builder.mutation({
      query: ({id}) => ({
        url: apiUrls.skills.details(id),
        method: 'DELETE'
      }),
      invalidatesTags: ['Skills']
    })
  })
});

export const getSkills = {
  type: `${skillsApi.reducerPath}/invalidateGroups`,
  payload: ['Skills']
};

export default skillsApi;

export const {
  useFetchSkillsQuery,
  useFetchAutocompleteSkillsQuery,
  useFetchRequestedSkillsQuery,
  useAddSkillMutation,
  useDeleteSkillMutation,
  useUpdateSkillMutation,
  useRejectRequestedSkillMutation
} = skillsApi;
