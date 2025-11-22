import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  data: [],
};

export const getAiSummary = createAsyncThunk(
  "/analysis/aisummary",
  async (id, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:8001/ai/analyze/${id}`,
        {},
        { withCredentials: true }
      );

      if (!response.data.success) {
        return thunkAPI.rejectWithValue(response.data.msg);
      }

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


const aiSlice = createSlice({
  name: "aisummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAiSummary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAiSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.success ? action.payload.data : null;
      })
      .addCase(getAiSummary.rejected, (state) => {
        state.isLoading = false;
        state.data = null;
      });
  },
});

export default aiSlice.reducer;
