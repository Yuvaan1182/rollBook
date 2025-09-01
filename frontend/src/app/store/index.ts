// src/app/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/slice';
// import invoiceReducer from '@/features/invoices/slice';
// import paymentReducer from '@/features/payments/slice';
// import subscriptionReducer from '@/features/subscriptions/slice';
// import analyticsReducer from '@/features/analytics/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // invoices: invoiceReducer,
    // payments: paymentReducer,
    // subscriptions: subscriptionReducer,
    // analytics: analyticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disable if you store non-serializable objects
    }),
  devTools: import.meta.env.MODE !== 'production',
});

// Infer RootState & AppDispatch from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
