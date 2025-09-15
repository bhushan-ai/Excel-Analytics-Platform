import express from "express";
import ParsedData from "../Models/parseData.model.js";

const parseRoute = express.Router();

parseRoute.get("/filedata/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, msg: "id not found" });
  }
  try {
    const fileData = await ParsedData.findById(id).select("data");
    if (!fileData) {
      return res.status(400).json({ success: false, msg: "file not found" });
    }

    return res
      .status(200)
      .json({ success: true, msg: "file data", data: fileData });
  } catch (error) {
    return res
      .status(200)
      .json({ success: false, msg: "Something is wrong in server" });
  }
});

export default parseRoute;
