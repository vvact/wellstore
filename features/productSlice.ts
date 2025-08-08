import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '@/services/products';
import type { Product } from '@/types';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Async thunk to fetch products
export const loadProducts = createAsyncThunk(
  'product/loadProducts',
  async () => {
    const data = await fetchProducts();
    return data.results; // adjust if your API returns different structure
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load products';
      });
  },
});

export default productSlice.reducer;
