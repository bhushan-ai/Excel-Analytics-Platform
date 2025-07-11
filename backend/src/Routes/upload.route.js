import express from "express";
import { authJWT } from "../../Config/authJs.js";
import {
  deleteFile,
  fileUpload,
  getFile,
} from "../Controllers/upload.controller.js";

const uploadRoute = express.Router();

//protectedRoute
uploadRoute.get("/:id", authJWT, getFile);
uploadRoute.post("/upload", authJWT, fileUpload);
uploadRoute.delete("/delete/:id", authJWT, deleteFile);

export default uploadRoute;
