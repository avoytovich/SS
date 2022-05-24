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
import authSlice from 'slices/auth';
import authApi from 'api/auth';
import tagsApi from 'api/tags';
import {smartSkillsApi} from 'slices/smartSkillsSlice';
import skillsApi from 'api/skills';

import {permissionsReducer} from './permissions/permissions';

const persistConfig = {
  key: 'auth',
  storage
};

const authPersisted = persistReducer(persistConfig, authSlice.reducer);

const rootReducer = combineReducers({
  auth: authPersisted,
  permissions: permissionsReducer,
  [smartSkillsApi.reducerPath]: smartSkillsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [tagsApi.reducerPath]: tagsApi.reducer,
  [skillsApi.reducerPath]: skillsApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(
      smartSkillsApi.middleware,
      authApi.middleware,
      tagsApi.middleware,
      skillsApi.middleware
    )
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
