import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
export interface Category {
  id: number;
  name: string;
  slug: string;
  children?: Category[];
  product_count?: number;
}

interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunk to fetch categories from API
export const fetchCategories = createAsyncThunk<Category[]>(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/categories/");
      // ✅ Extract only the array from the results key
      return response.data.results;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch categories"
      );
    }
  }
);

// Slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categoriesSlice.reducer;
