import {apiUrls} from 'constants/apiURLs';
import api from './api';

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    getUserProfile: builder.mutation({
      query: () => ({
        url: apiUrls.users.myProfile,
        method: 'get',
        params: {role: 'SuperAdmin'}
      })
    })
  })
});

export default authApi;

export const {useGetUserProfileMutation} = authApi;
