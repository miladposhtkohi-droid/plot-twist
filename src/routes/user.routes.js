import express from "express";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();


// get me route
router.get("/me",authMiddleware, async (req, res) => {
  const userId = req.userId;
    if (!userId) {  
    return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
    return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
});

// update me route
router.put("/me", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const { name, email } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, { name, email }, { new: true }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
});


// delete me route
router.delete("/me", authMiddleware, async (req, res) => {
  const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user" });
    }
});











// som admin 
// get user by id 
router.get("/:id", async (req, res) => {
    const userId = req.params.id;
    if (!userId) {  
    return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
    return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
});



export default router;