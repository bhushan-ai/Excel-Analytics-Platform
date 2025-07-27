import mongoose from "mongoose";

const parseDataSchema = new mongoose.Schema({
  upload: {
    type: mongoose.Types.ObjectId,
    ref: "Upload",
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sheetName: {
    type: String,
  },
  data: {
    type: [{}],
    required: true,
  },
  parsedAt: {
    type: Date,
    default: Date.now,
  },
});

const ParsedData =
  mongoose.models.ParsedData || mongoose.model("parsedData", parseDataSchema);

export default ParsedData;
