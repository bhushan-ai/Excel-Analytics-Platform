import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
// import bodyParser from "body-parser";
import { connectToDb } from "./Config/dbConnection.js";
import userRouter from "./src/Routes/user.route.js";
import uploadRoute from "./src/Routes/upload.route.js";
import analysisRouter from "./src/Routes/aiAnalysis.route.js";
import cookieParser from "cookie-parser";
import historyRouter from "./src/Routes/history.route.js";
import parseRoute from "./src/Routes/parseData.route.js";
const app = express();
const PORT = process.env.PORT || 8004;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.send(`Api started on port ${PORT}`);
});

//routes
app.use("/api/user", userRouter);
app.use("/file", uploadRoute);
app.use("/ai", analysisRouter);
app.use("/user", historyRouter);
app.use("/data", parseRoute);

connectToDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`something went wrong while starting the server`, err);
  });
