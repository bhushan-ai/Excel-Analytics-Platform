import jwt from "jsonwebtoken";
import User from "../src/Models/user.model.js";

export const authJWT = async (req, res, next) => {
  const token = req.cookies?.token;
  // console.log(token);
  if (!token) {
    return res
      .status(404)
      .json({ success: false, msg: "Not authorized login again" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    req.user = user;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: `error in authjs ${error.message} ` });
  }
};
