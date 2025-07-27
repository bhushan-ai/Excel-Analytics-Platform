import express from "express";
import { getExcelInsight } from "../Controllers/excel.Analysis.controller.js";
import { authJWT } from "../../Config/authJs.js";

const analysisRouter = express.Router();

analysisRouter.post("/analyze/:id", authJWT, getExcelInsight);

export default analysisRouter;
