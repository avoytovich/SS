import apiUrls from 'constants/apiURLs';

import api from './api';

const skillsApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchSkills: builder.query({
      query: queryOptions => ({
        url: apiUrls.skills.root,
        method: 'GET',
        params: queryOptions
      }),
      providesTags: ['Skills'],
      transformResponse: response => ({...response, skills: response.data})
    }),

    addSkill: builder.mutation({
      query: ({...params}) => ({
        url: apiUrls.skills.root,
        method: 'POST',
        body: params
      })
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
  type: `${skillsApi.reducerPath}/invalidateTags`,
  payload: ['Skills']
};

export default skillsApi;

export const {
  useFetchSkillsQuery,
  useAddSkillMutation,
  useDeleteSkillMutation,
  useUpdateSkillMutation
} = skillsApi;