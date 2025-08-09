// src/features/products/productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductsByCategorySlug, searchProducts } from '@/services/products';
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

// Fetch all products
export const loadProducts = createAsyncThunk(
  'product/loadProducts',
  async () => {
    const data = await fetchProducts();
    return data.results;
  }
);

// Fetch products by category slug
export const loadProductsByCategory = createAsyncThunk(
  'product/loadProductsByCategory',
  async (slug: string) => {
    const data = await fetchProductsByCategorySlug(slug);
    return data.results;
  }
);

// Fetch products by search query
export const loadProductsBySearch = createAsyncThunk(
  'product/loadProductsBySearch',
  async (query: string) => {
    const data = await searchProducts(query);
    return data.results;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // loadProducts
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
      })

      // loadProductsByCategory
      .addCase(loadProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(loadProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load category products';
      })

      // loadProductsBySearch
      .addCase(loadProductsBySearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProductsBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(loadProductsBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load searched products';
      });
  },
});

export default productSlice.reducer;
