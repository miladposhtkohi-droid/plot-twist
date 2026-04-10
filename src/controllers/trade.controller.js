import trade from "../models/Trade.js";
import * as tradeService from "../services/trade.services.js";

// create a new trade
export const createTrade = async (req, res) => {
  const { ownerPlantId, requesterPlantId } = req.body;
  const userId = req.userId;
  try {
    const trade = await tradeService.createTrade({
      ownerPlantId,
      requesterPlantId,
      userId,
    });
    res
      .status(201)
      .json({ success: true, message: "Trade created successfully", trade });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// private route to get my requests
export const getMyRequests = async (req, res) => {
  try {
    const userId = req.userId;
    const trades = await tradeService.getMyRequests(userId);
    res
      .status(200)
      .json({ success: true, message: "Trades fetched successfully", trades });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// get owner's trades
export const getMyTrades = async (req, res) => {
  try {
    const userId = req.userId;
    const trades = await tradeService.getMyTrades(userId);
    res
      .status(200)
      .json({ success: true, message: "Trades fetched successfully", trades });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// accept a trade
export const acceptTrade = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  console.log(userId)
  try {
    const trade = await tradeService.acceptTrade(id , userId);
    if (!trade) {
      return res
        .status(404)
        .json({ success: false, message: "Trade not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Trade accepted successfully", trade });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// reject a trade
export const rejectTrade = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const trade = await tradeService.rejectTrade(id , userId);
    if (!trade) {
      return res
        .status(404)
        .json({ success: false, message: "Trade not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Trade rejected successfully", trade });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// cancel a trade
export const cancelTrade = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const trade = await tradeService.cancelTrade(id , userId);
    if (!trade) {
      return res
        .status(404)
        .json({ success: false, message: "Trade not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Trade cancelled successfully", trade });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// complete a trade
export const completeTrade = async (req, res) => {
  const { id } = req.params;
  try {
    const trade = await tradeService.completeTrade(id);
    if (!trade) {
      return res
        .status(404)
        .json({ success: false, message: "Trade not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Trade completed successfully", trade });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
