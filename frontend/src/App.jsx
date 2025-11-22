import { Route, Routes } from "react-router-dom";
import Layout from "./components/Home/Layout";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import AuthLayout from "./components/Auth/AuthLayout";
import Upload from "./pages/UploadFile/Upload";
import Analytics from "./pages/Analytics/Analytics";
import AccLayout from "./components/Account/AccLayout";
import History from "./pages/Account/History";
import UserAccount from "./pages/Account/UserAccount";
import { ToastContainer } from "react-toastify";
import UserAuth from "./config/UserAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userIsAuthenticated } from "./store/auth/authSlice";
import UploadLayout from "./pages/UploadFile/UploadLayout";

function App() {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //console.log("isAuthenticated", isAuthenticated);

  useEffect(() => {
    dispatch(userIsAuthenticated());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={<Layout isAuthenticated={isAuthenticated} />}
        />

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        {/* upload */}
        <Route
          path="/upload"
          element={
            <UserAuth isAuthenticated={isAuthenticated} isLoading={isLoading}>
              <UploadLayout />{" "}
            </UserAuth>
          }
        >
          <Route path="uploadfile" element={<Upload />} />
          <Route path="analysis" element={<Analytics />} />
        </Route>
        {/*  */}
        <Route
          path="/acc"
          element={
            <UserAuth isAuthenticated={isAuthenticated} isLoading={isLoading}>
              <AccLayout />{" "}
            </UserAuth>
          }
        >
          <Route path="setting" element={<UserAccount />} />
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
