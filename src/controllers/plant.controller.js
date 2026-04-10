import Plant from "../models/Plant.js";
import * as plantService from "../services/plant.services.js";

//public routes
export const getAllPlants = async (req, res) => {
  try {
    const plants = await plantService.getAllPlants();
    res.status(200).json({ plants });
  } catch (error) {
    res.status(500).json({ message: "Error fetching plants" });
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
    res.status(500).json({ message: "Error fetching plant" });
  }
};

// private routes
// create plant
export const createPlant = async (req, res) => {
  console.log(req.userId);
  const { plantName, description, imageUrl , status } = req.body;

  if (!plantName || !description || !imageUrl || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const plant = await plantService.createPlant({
      plantName,
      description,
      imageUrl,
      status,
      ownerId: req.userId,
    });
    res.status(201).json({ message: "Plant created successfully", plant });
  } catch (error) {
    res.status(500).json({ message: "Error creating plant" });
  }
};

// get my plants
export const getMyPlants = async (req, res) => {
  console.log(req.userId);
  try {
    const plants = await plantService.getMyPlants(req.userId);
    res.status(200).json({success: true,message: "Plants fetched successfully", plants });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching plants 2", error: error.message });
  }
};

// update plant
export const updatePlant = async (req, res) => {
  const { id } = req.params;
  const { plantName, description, imageUrl , status} = req.body;
  if (!plantName || !description || !imageUrl || status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const plant = await plantService.updatePlant(id, { plantName, description, imageUrl , status}, req.userId);
    res.status(200).json({ message: "Plant updated successfully", plant });
  } catch (error) {
    res.status(500).json({ message: "Error updating plant" });
  }
};
// delete a plant
export const deletePlant = async (req, res) => {
  const { id } = req.params;
  try {
    await plantService.deletePlant(id, req.userId);
    res.status(200).json({ message: "Plant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting plant" });
  }
};
