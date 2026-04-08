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

router.get("/my-trades",tradeController.getMyTrades);
/* router.get("/my-trades/:id",tradeController.getMyTradeById);
router.put("/my-trades/:id/accept",tradeController.acceptTrade);
router.put("/my-trades/:id/reject",tradeController.rejectTrade);
router.put("/my-trades/:id/cancel",tradeController.cancelTrade);
router.put("/my-trades/:id/complete",tradeController.completeTrade); */
/* router.get("/:id", getTradeById);
router.put("/:id", updateTrade);
router.delete("/:id", deleteTrade); */


export default router;  