import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import { RootState } from "../store";

import AuthSession from 'utils/session';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, {getState}) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      // const token = (getState() as RootState).auth.token;
      console.log(getState());
      console.log(AuthSession.get());
      const token = AuthSession.get();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: () => ({})
});

export default api;
