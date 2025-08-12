import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  email: string;
  name: string;
  token: string; // access token
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const initialState: AuthState = {
  user:
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null,
  loading: false,
  error: null,
};

// Set axios base URL
axios.defaults.baseURL = API_BASE;

// If user exists on app load, set Authorization header automatically
if (initialState.user) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${initialState.user.token}`;
}

// Google Login thunk
export const googleLogin = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("auth/googleLogin", async (token, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_BASE}/auth/google/`, {
      token, // make sure your backend expects "token"
    });

    const { access, refresh, user } = res.data;

    // Save tokens in localStorage
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);

    return {
      email: user.email,
      name: user.name,
      token: access,
    };
  } catch (err: any) {
    // Adjust based on your backend error response structure
    return rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      delete axios.defaults.headers.common["Authorization"];
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("accessToken", action.payload.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.token}`;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${action.payload.token}`;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { logoutUser, setUser } = authSlice.actions;
export default authSlice.reducer;
