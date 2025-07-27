import mongoose, { mongo } from "mongoose";

const historySchema = new mongoose.Schema({
  file: {
    type: mongoose.Types.ObjectId,
    ref: "Upload",
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const History =
  mongoose.models.History || mongoose.model("history", historySchema);

export default History;
