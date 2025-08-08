import { configureStore } from '@reduxjs/toolkit';
import productReducer from '@/features/productSlice';  // Import the reducer, default export
// import loadProducts if you need it elsewhere

export const store = configureStore({
  reducer: {
    product: productReducer,  // Use the reducer here
  },
});

// Infer RootState and AppDispatch types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
