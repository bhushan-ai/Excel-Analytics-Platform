import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  uploadedFiles: "",
  data: {},
};

export const addFile = createAsyncThunk("/upload/file", async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post(
      "http://localhost:8001/file/upload",
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
});
export const getFileData = createAsyncThunk("/fileData", async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8001/data/filedata/${id}`,

      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    const msg = error.response?.data?.msg;
    console.log("getFileData ERROR:", msg);

    toast.error(msg || "Something went wrong");

    return rejectWithValue(error.response?.data);
  }
});

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFile.fulfilled, (state, action) => {
        //   console.log("actionpayload", action.payload.parsed);
        state.isLoading = false;
        state.uploadedFiles = action.payload.success
          ? action.payload.parsed
          : null;
      })
      .addCase(addFile.rejected, (state) => {
        state.isLoading = false;
        state.uploadedFiles = null;
      })
      .addCase(getFileData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFileData.fulfilled, (state, action) => {
        console.log("actionpayload", action.payload.parsed);
        state.isLoading = false;
        state.data = action.payload.success ? action.payload.data : null;
      })
      .addCase(getFileData.rejected, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export default uploadSlice.reducer;
