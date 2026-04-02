import express from "express";
import { getAllPlants } from "../controllers/plant.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createPlant, getPlantById , getMyPlants, updatePlant , deletePlant} from "../controllers/plant.controller.js";
const router = express.Router();


// public routes
// get all plants 
router.get("/", getAllPlants);

//  get my plant
router.get("/my-plants",authMiddleware, getMyPlants);
//  update plant 
router.put("/:id", authMiddleware, updatePlant);
// delete a plant 
router.delete("/:id", authMiddleware, deletePlant );


// get plant by id 
router.get("/:id", getPlantById )

// private routes ( you have to be logged in to access these routes )
// create plant
router.post("/",authMiddleware, createPlant);







// admin routes ( you have to be an admin to access these routes )
// -------------- some admin --------------
// ------------- update plant by id ----------------
// -------------- delete plant by id ----------------


export default router;
