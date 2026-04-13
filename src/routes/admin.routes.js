import express from "express";
const router = express.Router();

import { authMiddleware , adminMiddleware } from "../middleware/auth.middleware.js";   
import { getUserById , getAllUsers , updateUserById , deleteuserById} from "../controllers/user.controller.js";
 


// som admin 

// get all users
router.get("/users", authMiddleware , adminMiddleware, getAllUsers);


// get user by id 
router.get("/user/:id",authMiddleware , adminMiddleware, getUserById);

// update user by id
router.put("/user/:id",authMiddleware , adminMiddleware, updateUserById);
// delete user by id (admin only) - not implemented yet
router.delete("/user/:id",authMiddleware , adminMiddleware, deleteuserById);


export default router;

