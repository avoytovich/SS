import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';
import auth from './slices/auth';
import { smartSkillsApi } from './slices/smartSkillsSlice';

const persistConfig = {
  key: 'auth',
  storage,
};
const authPersisted = persistReducer(persistConfig, auth.reducer);

const rootReducer = combineReducers({
  auth: authPersisted,
  [smartSkillsApi.reducerPath]: smartSkillsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(smartSkillsApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
