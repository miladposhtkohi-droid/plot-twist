import trade from "../models/Trade.js";
import * as tradeService from "../services/trade.services.js";

// public routes
export const getMyTrades = async (req, res) => {
  try {
    const trades = await tradeService.getAllTrades();
    res.status(200).json({ success: true, message: "Trades fetched successfully", trades });
  } catch (error) {
    res.status(500).json({ success: false,message: error.message });
  }
};
// get owner's trades
// get requester's trades
// get trade by id
export const getTradeById = async (req, res) => {
  const { id } = req.params;    
    try {
    const trade = await tradeService.getTradeById(id);
    if (!trade) {
      return res.status(404).json({ success: false, message: "trade not found" });
    }   
    res.status(200).json({ success: true, message: "Trade fetched successfully", trade });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching trade" });
  }
};

// create a new trade
export const createTrade = async (req, res) => {
  const { ownerPlantId, requesterPlantId } = req.body;
  const requesterId = req.userId; 
  try {    const trade = await tradeService.createTrade({ ownerPlantId, requesterPlantId, requesterId });
    res.status(201).json({ success: true, message: "Trade created successfully", trade });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// accept a trade
export const acceptTrade = async (req, res) => {
  const { id } = req.params;
  try {
    const trade = await tradeService.acceptTrade(id);
    if (!trade) {
      return res.status(404).json({ success: false, message: "Trade not found" });
    }
    res.status(200).json({ success: true, message: "Trade accepted successfully", trade });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  } 
};

// reject a trade
export const rejectTrade = async (req, res) => {
  const { id } = req.params;
  try {
    const trade = await tradeService.rejectTrade(id);
    if (!trade) {
      return res.status(404).json({ success: false, message: "Trade not found" });
    }
    res.status(200).json({ success: true, message: "Trade rejected successfully", trade });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// cancel a trade
export const cancelTrade = async (req, res) => {
  const { id } = req.params;
  try {    const trade = await tradeService.cancelTrade(id);
    if (!trade) {
      return res.status(404).json({ success: false, message: "Trade not found" });
    }
    res.status(200).json({ success: true, message: "Trade cancelled successfully", trade });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  } 
};


// complete a trade
export const completeTrade = async (req, res) => {
  const { id } = req.params;
  try {    const trade = await tradeService.completeTrade(id);
    if (!trade) {
      return res.status(404).json({ success: false, message: "Trade not found" });
    }
    res.status(200).json({ success: true, message: "Trade completed successfully", trade });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

