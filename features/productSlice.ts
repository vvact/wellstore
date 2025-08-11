// src/features/products/productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProducts,
  fetchProductsByCategorySlug,
  searchProducts,
  fetchFeaturedProducts,
  fetchNewArrivals,
} from '@/services/products';
import type { Product } from '@/types';

// Define the shape of the product state in Redux
interface ProductState {
  products: Product[];            // All products (general list)
  featuredProducts: Product[];    // Featured products list
  newArrivals: Product[];         // New arrivals state
  loading: boolean;               // Loading state for general products
  featuredLoading: boolean;       // Loading state for featured products
  newArrivalsLoading: boolean;    // Loading state for new arrivals
  error: string | null;           // Error message for general products
  featuredError: string | null;   // Error message for featured products
  newArrivalsError: string | null; // Error message for new arrivals
}

// Initial state for products slice
const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  newArrivals: [],
  loading: false,
  featuredLoading: false,
  newArrivalsLoading: false,
  error: null,
  featuredError: null,
  newArrivalsError: null,
};


// Async thunk to fetch all products
export const loadProducts = createAsyncThunk<Product[]>(
  'product/loadProducts',
  async () => {
    const data = await fetchProducts();
    return data; // Return the product array directly
  }
);

// Async thunk to fetch products filtered by category slug
export const loadProductsByCategory = createAsyncThunk<Product[], string>(
  'product/loadProductsByCategory',
  async (slug: string) => {
    const data = await fetchProductsByCategorySlug(slug);
    return data;
  }
);

// Async thunk to fetch products matching a search query
export const loadProductsBySearch = createAsyncThunk<Product[], string>(
  'product/loadProductsBySearch',
  async (query: string) => {
    const data = await searchProducts(query);
    return data;
  }
);

// Async thunk to fetch featured products from backend
export const loadFeaturedProducts = createAsyncThunk<Product[]>(
  'product/loadFeaturedProducts',
  async () => {
    const data = await fetchFeaturedProducts();
    return data;
  }
);

// Thunk to fetch new arrivals
export const loadNewArrivals = createAsyncThunk<Product[]>(
  'product/loadNewArrivals',
  async () => {
    const data = await fetchNewArrivals(); // implement this service
    return data;
  }
);


// Create the product slice with reducers and extra reducers
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {}, // No synchronous reducers needed currently
  extraReducers: (builder) => {
    builder
      // Handle loadProducts lifecycle actions
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

      // Handle loadProductsByCategory lifecycle actions
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

      // Handle loadProductsBySearch lifecycle actions
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
      })

      // Handle loadFeaturedProducts lifecycle actions
      .addCase(loadFeaturedProducts.pending, (state) => {
        state.featuredLoading = true;
        state.featuredError = null;
      })
      .addCase(loadFeaturedProducts.fulfilled, (state, action) => {
        state.featuredLoading = false;
        state.featuredProducts = action.payload;
      })
      .addCase(loadFeaturedProducts.rejected, (state, action) => {
        state.featuredLoading = false;
        state.featuredError = action.error.message ?? 'Failed to load featured products';
      })

      // Handle loadNewArrivals lifecycle actions
      .addCase(loadNewArrivals.pending, (state) => {
        state.newArrivalsLoading = true;
        state.newArrivalsError = null;
      })
      .addCase(loadNewArrivals.fulfilled, (state, action) => {
        state.newArrivalsLoading = false;
        state.newArrivals = action.payload;
      })
      .addCase(loadNewArrivals.rejected, (state, action) => {
        state.newArrivalsLoading = false;
        state.newArrivalsError = action.error.message ?? 'Failed to load new arrivals';
      });
  },
});

export default productSlice.reducer;
