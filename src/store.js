import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { smartSkillsApi } from './slices/smartSkillsSlice';

export const store = configureStore({
  reducer: {
    [smartSkillsApi.reducerPath]: smartSkillsApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(smartSkillsApi.middleware),
});

setupListeners(store.dispatch);
