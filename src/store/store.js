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
import authApi from 'api/auth';
import tagsApi from 'api/tags';
import skillsApi from 'api/skills';
import profileApi from 'api/profile';
import employeesApi from 'api/employees';

import {permissionsReducer} from './permissions/permissions';

const persistConfig = {
  key: 'auth',
  storage
};

const authPersisted = persistReducer(persistConfig, authSlice.reducer);

const rootReducer = combineReducers({
  auth: authPersisted,
  permissions: permissionsReducer,
  [authApi.reducerPath]: authApi.reducer,
  [tagsApi.reducerPath]: tagsApi.reducer,
  [skillsApi.reducerPath]: skillsApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(
      authApi.middleware,
      tagsApi.middleware,
      skillsApi.middleware,
      profileApi.middleware,
      employeesApi.middleware
    )
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
