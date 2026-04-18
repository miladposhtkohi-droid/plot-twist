import Plant from "../models/Plant.js";
import * as plantService from "../services/plant.services.js";

//public routes
export const getAllPlants = async (req, res) => {
  try {
    const plants = await plantService.getAllPlants();
    res.status(200).json({ plants });
  } catch (error) {
    next(error);
  }
};
//get plant by id
export const getPlantById = async (req, res) => {
  const { id } = req.params;
  try {
    const plant = await plantService.getPlantById(id);
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }
    res.status(200).json({ plant });
  } catch (error) {
    next(error);
  }
};

// private routes
// create plant
export const createPlant = async (req, res) => {
  console.log(req.userId);
  const { plantName, description, imageUrl, status, location } = req.body;

  try {
    const plant = await plantService.createPlant({
      plantName,
      description,
      imageUrl,
      status,
      ownerId: req.userId,
      location: {
        type: "Point",
        coordinates: location.coordinates,
      },
    });
    res.status(201).json({ message: "Plant created successfully", plant });
  } catch (error) {
    next(error);
  }
};

// get my plants
export const getMyPlants = async (req, res) => {
  console.log(req.userId);
  try {
    const plants = await plantService.getMyPlants(req.userId);
    res
      .status(200)
      .json({ success: true, message: "Plants fetched successfully", plants });
  } catch (error) {
    next(error);
  }
};

// update plant
export const updatePlant = async (req, res) => {
  const { id } = req.params;
  const { plantName, description, imageUrl, status, location } = req.body;

  try {
    const plant = await plantService.updatePlant(
      id,
      { plantName, description, imageUrl, status, location },
      req.userId,
    );
    res.status(200).json({ message: "Plant updated successfully", plant });
  } catch (error) {
    next(error);
  }
};
// delete a plant
export const deletePlant = async (req, res) => {
  const { id } = req.params;
  try {
    await plantService.deletePlant(id, req.userId);
    res.status(200).json({ message: "Plant deleted successfully" });
  } catch (error) {
    next(error);
  }
};
