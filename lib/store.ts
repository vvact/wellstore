import { configureStore } from '@reduxjs/toolkit';
import productReducer from '@/features/productSlice';
import cartReducer from '@/features/cartSlice';
import categoryReducer from "@/features/categorySlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    categories: categoryReducer,
  },
});

// Infer RootState and AppDispatch types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
