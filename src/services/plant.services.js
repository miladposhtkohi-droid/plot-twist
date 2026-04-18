import Plant from "../models/Plant.js";


//get all plants function
export const getAllPlants = async () => {

        const plants = await Plant.find({ status: "available" });
        if (plants.length === 0 ) {
            const error = new Error("No plants found");
            error.statusCode = 404;
            throw error;
        }
        return plants;

};

// get plant by id function
export const getPlantById = async (id) => {
    const plant = await Plant.findById(id);
    if (!plant) {
        const error = new Error("Plant not found");
        error.statusCode = 404;
        throw error;
    }
    return plant;
};


// create plant function
export const createPlant = async ({ plantName, description, imageUrl, ownerId , status, location}) => {
    const plant = new Plant({
        plantName,
        description,
        imageUrl,
        status,
        location,
        ownerId,
    });
    await plant.save();
    return plant;
};




// get my plants function
export const getMyPlants = async (ownerId) => {
    const plants = await Plant.find({ ownerId });
    if (plants.length === 0) {
        const error = new Error("No plants found");
        error.statuscode = 404;
        throw error;
    }
    return plants;
};


//update plant function
export const updatePlant = async (id, { plantName, description, imageUrl , status, location }, ownerId) => {
    const plant = await Plant.findById(id);
    if (!plant) {
        const error = new Error("Plant not found");
        error.statuscode = 404;
        throw error;
    }
    if (plant.ownerId.toString() !== ownerId) {
        const error = new Error("Unauthorized");
        error.statuscode = 401;
        throw error;
    }
    plant.plantName = plantName || plant.plantName;
    plant.description = description || plant.description;
    plant.imageUrl = imageUrl || plant.imageUrl;
    plant.status = status || plant.status
    plant.location = location || plant.location;
    await plant.save();
    return plant;
}


// delete plant function
export const deletePlant = async (id, ownerId) => {
    const plant = await Plant.findById(id);
    if (!plant) {
        const error = new Error("Plant not found");
        error.statuscode = 404;
        throw error;
    }
    if (plant.ownerId.toString() !== ownerId) {
        const error = new Error("Unauthorized");
        error.statuscode = 401;
        throw error;
    }
    await Plant.findByIdAndDelete(id);
    return;
}

