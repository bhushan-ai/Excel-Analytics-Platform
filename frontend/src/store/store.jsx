import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.jsx";
import uploadReducer from "./upload/uploadSlice.jsx";
import aiReducer from "./AiSummary/aiSlice.jsx";
const store = configureStore({
  reducer: {
    auth: authReducer,
    uploadFile: uploadReducer,
    aiSummary: aiReducer,
  },
});

export default store;
