import {fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

import {API_URL_PREFIXES} from 'constants/apiUrlPrefixes';
import Session from './session';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL_PREFIXES.PREFIX_BASE_URL,
  prepareHeaders: headers => {
    const token = Session.get();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

export {baseQuery};
