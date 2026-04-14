import express from "express";
const router = express.Router();
import { register , login } from "../controllers/auth.controller.js";
import { registerUserValidation, loginUserValidation } from "../schemas/user.schemas.js";
import { handleValidation } from "../middleware/handleValidation.middleware.js";


router.post("/register", registerUserValidation, handleValidation, register );
router.post("/login", loginUserValidation, handleValidation, login );

export default router;
