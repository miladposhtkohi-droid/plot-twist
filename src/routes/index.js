import express from "express";
const router = express.Router();


import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import adminRoutes from "./admin.routes.js";
import plantRoutes from "./plant.routes.js";
import tradeRoutes from "./trade.routes.js";

router.get("/", (req, res) => {
  res.json({ message: "Webbshop API test", stack: "MEN (MongoDB, Express, Node.js)" });
});

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/plants", plantRoutes);
router.use("/trades", tradeRoutes);

// 404 handler
router.use((req, res , next) => {
  const error = new Error("Route Not Found");
  error.status = 404;
  next(error);
});
// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);  
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

export default router;