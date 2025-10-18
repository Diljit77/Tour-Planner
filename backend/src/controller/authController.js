import User from "../models/User.js";
import jwt from "jsonwebtoken";

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

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

  res.json({ user, token: createToken(user._id) });
};
