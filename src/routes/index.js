import express from "express";
const router = express.Router();


import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import adminRoutes from "./admin.routes.js";
import plantRoutes from "./plant.routes.js";
import tradeRoutes from "./trade.routes.js";



router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/plants", plantRoutes);
router.use("/trades", tradeRoutes);

export default router;