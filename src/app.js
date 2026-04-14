import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler , notFound } from "./middleware/error.middleware.js";
const app = express();
let isConnected = false;

// Database connection
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
}

// Middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Webbshop API test", stack: "MEN (MongoDB, Express, Node.js)" });
});


// Routes index
app.use("/api", routes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;
