import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.json({ user, token: createToken(user._id) });
  } catch (err) {
    res.status(400).json({ message: "Email already exists" });
  }
};
export const googleLogin = async (req, res) => {
  const { name, email } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ name, email, isGoogleUser: true });
    await user.save();
  }

  
  const token = createToken(user._id);
  res.json({ user, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

  res.json({ user, token: createToken(user._id) });
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Email does not exist" });


  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000; 
  await user.save();


  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetLink = `${process.env.FRONTEND_URL}auth/reset-password/${token}`;
  await transporter.sendMail({
    from: `"WanderAI" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Password Reset",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Token expires in 1 hour.</p>`,
  });

  res.json({ message: "Password reset link sent!" });
};
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });
  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  user.password = newPassword; 
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.json({ message: "Password updated successfully!" });
};
