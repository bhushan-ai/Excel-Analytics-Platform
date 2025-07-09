import User from "../Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "24h" });
};

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  if ([username, password, email].some((field) => field?.trim() === "")) {
    return res
      .status(400)
      .json({ success: false, msg: "All fields are required" });
  }

  if (username.length > 12) {
    return res.status(400).json({ success: false, msg: "username not valid " });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, msg: "Email is not correct" });
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return res.status(400).json({
      success: false,
      msg: "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.",
    });
  }

  const adminExist = await User.findOne({ role: "ADMIN" });
  if (role === "ADMIN" && adminExist) {
    return res
      .status(403)
      .json({ success: false, msg: "there can be only one admin" });
  }

  const hashedPass = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      username,
      email,
      password: hashedPass,
      role,
    });
    const token = createToken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? none : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      msg: "Account Created Successfully",
      newUser,
      token,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(504).json({
      success: false,
      msg: "something went wrong while creating user",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(403)
      .json({ success: false, msg: "email and password is required " });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ success: false, msg: "User not found " });
    }

    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      return res
        .status(403)
        .json({ success: false, msg: "Incorrect password" });
    }
    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? none : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      msg: "Logged in Successfully",
      user,
      token,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      msg: "something went wrong while login user",
    });
  }
};

//update user
export const updateUser = async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res
      .status(403)
      .json({ success: false, msg: "Username and email are required." });
  }
  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, msg: "Email is not correct" });
  }

  if (username.length > 12) {
    return res.status(400).json({ success: false, msg: "username not valid " });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        email,
        username,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(403).json({ success: false, msg: "User not found " });
    }

    return res
      .status(200)
      .json({ success: true, updateUser, msg: "user updated successfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      msg: "something went wrong updating user",
    });
  }
};

//change password

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res
      .status(403)
      .json({ success: false, msg: "Current and new password is required " });
  }
  if (
    !validator.isStrongPassword(newPassword, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return res.status(400).json({
      success: false,
      msg: "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.",
    });
  }

  try {
    const user = await User.findById(req.user?._id).select("password");

    const matched = await bcrypt.compare(currentPassword, user.password);

    if (!matched) {
      return res
        .status(403)
        .json({ success: false, msg: "current password is incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    await user.save();

    return res.status(201).json({
      success: true,
      updateUser,
      msg: "password updated successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      msg: "something went wrong updating user",
    });
  }
};

//logout

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? none : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ success: true, msg: "Logged Out" });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

//getUser

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);
    return res
      .status(200)
      .json({ success: true, user, msg: "User details fetched" });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};
