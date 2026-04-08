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
