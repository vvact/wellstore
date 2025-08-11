import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/lib/axios";

interface Category {
  id: number;
  name: string;
  image: string | null;
  slug: string;
  product_count: number;
}

interface CategoryState {
  data: Category[];
  loading: boolean;
  error: string | null;
}

// Async thunk to fetch categories
export const fetchCategories = createAsyncThunk<Category[]>(
  "categories/fetchCategories",
  async () => {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseURL) {
      throw new Error("API base URL is not set in environment variables");
    }
    const res = await axios.get<Category[]>(`${baseURL}/products/categories/`);
    return res.data;
  }
);

const initialState: CategoryState = {
  data: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load categories";
      });
  },
});

export default categorySlice.reducer;
