import express from "express";
import User from "../models/User.js";
import { authMiddleware , adminMiddleware } from "../middleware/auth.middleware.js";

import { getMe , updateMe , deleteMe , getUserById, getAllUsers} from "../controllers/user.controller.js";
const router = express.Router();


// get me route
router.get("/me",authMiddleware, getMe);
// update me route
router.put("/me", authMiddleware, updateMe);
// delete me route
router.delete("/me", authMiddleware, deleteMe );











export default router;