import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }
  const existingemail = await User.findOne({ email });
  if (existingemail) {
    return res.status(400).json({ message: "Email already exists" });
  }
  // hashing password before saving to database
  const salt = await bcrypt.genSalt(2);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({  name,  email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: "User registered successfully", user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  // comparing the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
  res.status(200).json({ message: "User logged in successfully", user });
});

export default router;
