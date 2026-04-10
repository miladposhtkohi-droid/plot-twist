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

// get user's requests trades
export const getMyTrades = async (userId , plantId) => {
  const trades = await Trade.find({ requesterId: userId, requesterPlantId: plantId }).populate("ownerPlantId requesterPlantId requesterId ownerId");
  if (!trades || trades.length === 0) {
    const error = new Error("No trades found");
    error.status = 404;
    throw error;
  }
  return trades;
}

// get ownder's trades
export const getTradeById = async (plantId , userId) => {
  const trade = await Trade.findOne({ownerId: userId , ownerPlantId: plantId}).populate("ownerPlantId requesterPlantId requesterId ownerId");
  if (!trade) {
    const error = new Error("Trade not found");
    error.status = 404;
    throw error;
  }
  return trade;
};

// accept a trade
export const acceptTrade = async (tradeId) => {
  const trade = await Trade.findById(tradeId);
  if (!trade) {
    const error = new Error("Trade not found");
    error.status = 404;
    throw error;
  }
  if (trade.status !== "pending") {
    const error = new Error("Only pending trades can be accepted");
    error.status = 400;
    throw error;
  }
  trade.status = "accepted";
  await trade.save();
  return trade;
};

// reject a trade
export const rejectTrade = async (tradeId) => {
  const trade = await Trade.findById(tradeId);
  if (!trade) {
    const error = new Error("Trade not found");
    error.status = 404;
    throw error;
  }
  if (trade.status !== "pending") {
    const error = new Error("Only pending trades can be rejected");
    error.status = 400;
    throw error;
  } 
  trade.status = "rejected";
  await trade.save();
  return trade;
};

// cancel a trade
export const cancelTrade = async (tradeId) => {
  const trade = await Trade.findById(tradeId);
  if (!trade) {
    const error = new Error("Trade not found");
    error.status = 404;
    throw error;
  }
  if (trade.status !== "pending") {
    const error = new Error("Only pending trades can be cancelled");
    error.status = 400;
    throw error;
  }
  trade.status = "cancelled";
  await trade.save();
  return trade;
};

// complete a trade
export const completeTrade = async (tradeId) => {
  const trade = await Trade.findById(tradeId);
  if (!trade) {
    const error = new Error("Trade not found");
    error.status = 404;
    throw error;
  }
  if (trade.status !== "accepted") {
    const error = new Error("Only accepted trades can be completed");
    error.status = 400;
    throw error;
  }
  trade.status = "completed";
  trade.complationDate = new Date();
  await trade.save();
  return trade;
};

