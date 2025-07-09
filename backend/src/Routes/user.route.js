import { authJWT } from "../../Config/authJs.js";
import express from "express";
import {
  changePassword,
  getUser,
  login,
  logout,
  register,
  updateUser,
} from "../Controllers/user.controller.js";

const userRouter = express.Router();

//public routes
userRouter.post("/register", register);
userRouter.post("/login", login);

//protected Routes
userRouter.post("/logout", logout);
userRouter.get("/me", authJWT, getUser);
userRouter.put("/profile", authJWT, updateUser);
userRouter.put("/password", authJWT, changePassword);

export default userRouter;
