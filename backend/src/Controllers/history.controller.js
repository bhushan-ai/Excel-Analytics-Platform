import History from "../Models/history.model.js";

export const history = async (req, res) => {
  try {
    const history = await History.findById(req.user?._id)
      .populate("file filename ")
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json({ success: true, message: "history fetched", history });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `something went wrong in getting history ${error.message}`,
    });
  }
};
