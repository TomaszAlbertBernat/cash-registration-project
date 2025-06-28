import { configureStore } from '@reduxjs/toolkit';
import { cashRegisterSlice } from './slices/cashRegisterSlice';

export const store = configureStore({
  reducer: {
    cashRegister: cashRegisterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 