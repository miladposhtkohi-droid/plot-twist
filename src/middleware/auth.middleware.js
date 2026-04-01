import jwt from "jsonwebtoken"; 

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