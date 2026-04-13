import Trade from "../models/Trade.js";
import Plant from "../models/Plant.js";

// Get all trades
export const getAllTrades = async () => {
  const trades = await Trade.find().populate(
    "ownerPlantId requesterPlantId requesterId ownerId",
  );
  if (!trades || trades.length === 0) {
    const error = new Error("No trades found");
    error.status = 404;
    throw error;
  }
  return trades;
};

// create a new trade
export const createTrade = async ({
  ownerPlantId,
  requesterPlantId,
  userId,
}) => {
  const ownerPlant = await Plant.findById(ownerPlantId);
  if (!ownerPlant) {
    const error = new Error("Owner plant not found");
    error.status = 404;
    throw error;
  }
  if (ownerPlant.status !== "available") {
    const error = new Error("Plant not Available");
    error.statusCode = 404;
    throw error;
  }

  const requesterPlant = await Plant.findById(requesterPlantId);
  if (!requesterPlant) {
    const error = new Error("Requester plant not found");
    error.status = 404;
    throw error;
  }
  if (requesterPlant.status !== "available") {
    const error = new Error("Plant not Available");
    error.statusCode = 404;
    throw error;
  }

  // controll ownerid with userId
  if (ownerPlant.ownerId.toString() === userId) {
    const error = new Error("Owner cannot request a trade for their own plant");
    error.status = 400;
    throw error;
  }

  if (requesterPlant.ownerId.toString() !== userId) {
    console.log(requesterPlant);
    console.log(userId);
    const error = new Error("Requester does not own the requester plant");
    error.status = 403;
    throw error;
  }
  const existingTrade = await Trade.findOne({
    ownerPlantId,
    requesterPlantId,
    requesterId: userId,
    ownerId: ownerPlant.ownerId,
    status: "pending",
  });
  if (existingTrade) {
    const error = new Error("A pending trade already exists for these plants");
    error.status = 400;
    throw error;
  }
  const ownerId = ownerPlant.ownerId;
  const trade = new Trade({
    ownerPlantId,
    requesterPlantId,
    requesterId: userId,
    ownerId,
  });
  // populate the trade with plant and username

  await trade.save();
  return trade;
};

// get user's requests trades
export const getMyRequests = async (userId, plantId) => {
  const trades = await Trade.find({ requesterId: userId })
    .populate({
      path: "ownerPlantId",
      select: "plantName description imageUrl status",
    })
    .populate({
      path: "requesterPlantId",
      select: "plantName description imageUrl status",
    })
    .populate({
      path: "requesterId",
      select: "name",
    })
    .populate({
      path: "ownerId",
      model: "User",
      select: "name",
    });
  if (!trades || trades.length === 0) {
    const error = new Error("No trades found");
    error.status = 404;
    throw error;
  }
  return trades;
};

// get user's owned trades
export const getMyTrades = async (userId) => {
  const trades = await Trade.find({ ownerId: userId })
    .populate({
      path: "ownerPlantId",
      select: "plantName description imageUrl status",
    })
    .populate({
      path: "requesterPlantId",
      select: "plantName description imageUrl status",
    })
    .populate({
      path: "requesterId",
      select: "name",
    })
    .populate({
      path: "ownerId",
      model: "User",
      select: "name",
    });
  if (!trades || trades.length === 0) {
    const error = new Error("No trades found");
    error.status = 404;
    throw error;
  }
  return trades;
};

// get ownder's trades
export const getTradeById = async (plantId, userId) => {
  const trade = await Trade.findOne({
    ownerId: userId,
    ownerPlantId: plantId,
  }).populate("ownerPlantId requesterPlantId requesterId ownerId");
  if (!trade) {
    const error = new Error("Trade not found");
    error.status = 404;
    throw error;
  }
  return trade;
};

// accept a trade
export const acceptTrade = async (id, userId) => {
  const trade = await Trade.findById(id);
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
  if (trade.ownerId.toString() !== userId) {
    const error = new Error("Only the owner can accept the trade");
    error.status = 403;
    throw error;
  }
  const plant = await Plant.findById(trade.ownerPlantId);
  if (plant.status !== "available") {
    const error = new Error("Owner plant is not available for trade");
    error.status = 400;
    throw error;
  }
  plant.status = "trading";
  trade.status = "accepted";
  await trade.save();
  return trade;
};

// reject a trade
export const rejectTrade = async (tradeId, userId) => {
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
  if (trade.ownerId.toString() !== userId) {
    const error = new Error("Only the owner can reject the trade");
    error.status = 403;
    throw error;
  }
  trade.status = "rejected";
  await trade.save();
  return trade;
};

// cancel a trade
export const cancelTrade = async (tradeId, userId) => {
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
  if (trade.requesterId.toString() !== userId) {
    const error = new Error("Only the requester can cancel the trade");
    error.status = 403;
    throw error;
  }
  trade.status = "cancelled";
  await trade.save();
  return trade;
};

// complete a trade
export const completeTrade = async (tradeId, userId) => {
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
  if (trade.ownerId.toString() !== userId) {
    if (trade.requesterId.toString() !== userId) {
      console.log(trade.ownerId, trade.requesterId.toString(), "xxx", userId);
      const error = new Error(
        "Only the owner or requester can complete the trade",
      );
      error.status = 403;
      throw error;
    }
  }

  trade.status = "completed";
  if (trade.ownerId.toString() === userId) {
    trade.completedAt = new Date();
  }
  const ownerPlant = await Plant.findById(trade.ownerPlantId);
  const requesterPlant = await Plant.findById(trade.requesterPlantId);

  ownerPlant.status = "traded";
  ownerPlant.ownerId = trade.requesterId;

  requesterPlant.status = "traded";
  requesterPlant.ownerId = trade.ownerId;

  await ownerPlant.save();
  await requesterPlant.save();

  await trade.save();
  return trade;
};
