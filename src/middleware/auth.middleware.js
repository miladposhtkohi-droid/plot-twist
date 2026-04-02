import jwt from "jsonwebtoken"; 
import User from "../models/User.js";


export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
        // Verifying the token and extracting the user ID from the token payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
    } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
    }
};


export const adminMiddleware =async (req, res, next) => {
  const adminRole = await User.findById(req.userId);
  console.log(adminRole)
  if (adminRole.roll !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
}