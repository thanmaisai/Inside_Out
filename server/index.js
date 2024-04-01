import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.js";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Add body parser middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/authentication", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Add route to handle form submissions
app.post("/submit", async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Data validation (optional)
      if (!username || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const user = await User.findOne({ email });
      if (user) {
        return res.status(409).json({ message: "User already exists" });
      }
  res.send("Data submitted successfully");
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
}
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
