import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import * as tradeController from '../controllers/trade.controller.js';
const router = express.Router();


// get all trades (admin route)
// @todo protect this route to be only accessible by admin users
/* router.get("/", getAllTrades);
 */
// protected routes
router.use(authMiddleware);

router.post("/", tradeController.createTrade);
// get my trades
router.get("/my-trades",tradeController.getMyTrades);

// get trade by id
router.get("/my-trades/:id",tradeController.getTradeById);

// accept a trade
router.put("/my-trades/:id/accept",tradeController.acceptTrade);

// reject a trade
router.put("/my-trades/:id/reject",tradeController.rejectTrade);

// cancel a trade
router.put("/my-trades/:id/cancel",tradeController.cancelTrade);

// complete a trade
router.put("/my-trades/:id/complete",tradeController.completeTrade); 
// router.get("/:id", tradeController.getTradeById);
// router.put("/:id", tradeController.updateTrade);
// router.delete("/:id", tradeController.deleteTrade); 


export default router;  