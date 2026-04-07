import Plant from "../models/Plant.js";

//public routes
export const getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    if (plants.length === 0) {
      return res.status(404).json({ message: "No plants found" });
    }
    res.status(200).json({ plants });
  } catch (error) {
    res.status(500).json({ message: "Error fetching plants" });
  }
};
//get plant by id
export const getPlantById = async (req, res) => {
  const { id } = req.params;
  try {
    const plant = await Plant.findById(id);
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
  const { plantName, description, imageUrl } = req.body;
  if (!plantName || !description || !imageUrl) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const plant = new Plant({
      plantName,
      description,
      imageUrl,
      ownerId: req.userId,
    });
    await plant.save();
    res.status(201).json({ message: "Plant created successfully", plant });
  } catch (error) {
    res.status(500).json({ message: "Error creating plant" });
  }
};

// get my plants
export const getMyPlants = async (req, res) => {
  console.log(req.userId);
  try {
    const plants = await Plant.find({ ownerId: req.userId });
    if (plants.length === 0) {
      return res.status(404).json({ message: "No plants found" });
    }
    res.status(200).json({ plants });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching plants 2", error: error.message });
  }
};

// update plant
export const updatePlant = async (req, res) => {
  const { id } = req.params;
  const { plantName, description, imageUrl } = req.body;
  if (!plantName || !description || !imageUrl) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const plant = await Plant.findById(id);
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }
    if (plant.ownerId.toString() !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    plant.plantName = plantName;
    plant.description = description;
    plant.imageUrl = imageUrl;
    await plant.save();
    res.status(200).json({ message: "Plant updated successfully", plant });
  } catch (error) {
    res.status(500).json({ message: "Error updating plant" });
  }
};
// delete a plant
export const deletePlant = async (req, res) => {
  const { id } = req.params;
  try {
    const plant = await Plant.findById(id);
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }
    if (plant.ownerId.toString() !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    await plant.deleteOne();
    res.status(200).json({ message: "Plant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting plant" });
  }
};
