import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import {setupListeners} from '@reduxjs/toolkit/query';
import authSlice from 'store/auth';
import authApi from 'api/profile';
import tagsApi from 'api/tags';
import skillsApi from 'api/skills';
import employeesApi from 'api/employees';
import api from 'api/api';

import {permissionsReducer} from './permissions/permissions';

const persistConfig = {
  key: 'auth',
  storage
};

const authPersisted = persistReducer(persistConfig, authSlice.reducer);

const rootReducer = combineReducers({
  auth: authPersisted,
  permissions: permissionsReducer,
  [api.reducerPath]: api.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [tagsApi.reducerPath]: tagsApi.reducer,
  [skillsApi.reducerPath]: skillsApi.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(api.middleware)
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
