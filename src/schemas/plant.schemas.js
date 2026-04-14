import e from "express";
import {body} from "express-validator";

export const createPlantValidation = [
    body("plantName").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("imageUrl").isURL().withMessage("Valid image URL is required"),
    body("status").isIn(["available", "trading", "traded", "notAvailable"]).withMessage("Status must be one of available, trading, traded, notAvailable"),
   
   
];



export const updatePlantValidation = [
    body("plantName").optional().isString().withMessage("Name must be a string"),
     body("description").optional().isString().withMessage("Description must be a string"),
    body("imageUrl").optional().isURL().withMessage("Valid image URL is required"),
    body("status").optional().isIn(["available", "trading", "traded", "notAvailable"]).withMessage("Status must be one of available, trading, traded, notAvailable"),
];

