import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isLoading: true, // Start as true to indicate auth is being checked on app load
  isAuthenticated: false,
  user: null,
};

// Existing thunks (kept as-is, but improved error handling where needed)

export const registerUser = createAsyncThunk(
  "/auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8001/api/user/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.msg || "Registration failed";
      toast.error(message);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8001/api/user/login",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.msg || "Login failed";
      toast.error(message);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "/auth/update",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:8001/api/user/profile",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.msg || "Update failed";
      toast.error(message);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  try {
    const response = await axios.post(
      "http://localhost:8001/api/user/logout",
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    const message = error.response?.data?.msg || "Logout failed";
    toast.error(message);
  }
});

// 🔁 NEW: Unified auth check on app load (replaces the placeholder checkAuthStatus)
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      // Call your existing backend auth endpoint
      const response = await axios.get(
        "http://localhost:8001/api/user/user-auth",
        {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );
      return response.data; // Expected: { success: true, user: {...} }
    } catch (error) {
      // Optional: clear any stale data
      return rejectWithValue(null);
    }
  }
);

// Optional: Keep userIsAuthenticated if used elsewhere (but now redundant)
// We'll keep it for backward compatibility, but recommend using checkAuthStatus

export const userIsAuthenticated = checkAuthStatus;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearAuthState: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        // Note: Registration doesn't log user in automatically
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.success) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
        } else {
          state.isAuthenticated = false;
          state.user = null;
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      // checkAuthStatus (used on app load)
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.success) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
        } else {
          state.isAuthenticated = false;
          state.user = null;
        }
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isLoading = false;
      })

      // logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = false;
      })

      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.success) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
        }
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        // Do not log out user on profile update failure
        // state.isAuthenticated = false;
        // state.user = null;
      });
  },
});

export const { setUser, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
