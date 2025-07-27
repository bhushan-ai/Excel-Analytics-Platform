import express from "express";
import { history } from "../Controllers/history.controller.js";
import { authJWT } from "../../Config/authJs.js";
const historyRouter = express.Router();

historyRouter.get("/history", authJWT, history);

export default historyRouter;
