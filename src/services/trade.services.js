import Trade from "../models/Trade.js";
import Plant from "../models/Plant.js";

// Get all trades
export const getAllTrades = async () => {
  const trades = await Trade.find().populate("ownerPlantId requesterPlantId requesterId ownerId");
  if (!trades || trades.length === 0) {
    const error = new Error("No trades found");
    error.status = 404;
    throw error;
  }
  return trades;
};

// create a new trade
export const createTrade = async ({ ownerPlantId, requesterPlantId, requesterId }) => {

  const ownerPlant = await Plant.findById(ownerPlantId);
  if (!ownerPlant) {
    const error = new Error("Owner plant not found");
    error.status = 404;
    throw error;
  }
  const requesterPlant = await Plant.findById(requesterPlantId);
  if (!requesterPlant) {
    const error = new Error("Requester plant not found");
    error.status = 404;
    throw error;
  }

  if (requesterPlant.ownerId.toString() !== requesterId.toString()) {
    const error = new Error("Requester does not own the requester plant");
    error.status = 403;
    throw error;
  }
  const existingTrade = await Trade.findOne({
    ownerPlantId,
    requesterPlantId,
    status: "pending",
  });
  if (existingTrade) {
    const error = new Error("A pending trade already exists for these plants");
    error.status = 400;
    throw error;
  }
  const ownerId = ownerPlant.ownerId;
  const trade = new Trade({ ownerPlantId, requesterPlantId, requesterId, ownerId });
  await trade.save();
  return trade;
};


