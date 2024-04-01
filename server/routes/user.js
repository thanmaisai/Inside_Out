import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    return res.json({ message: "User created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error saving user" });
  }
});

export { router as userRouter };
