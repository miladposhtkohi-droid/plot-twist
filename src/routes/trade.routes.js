import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import * as tradeController from '../controllers/trade.controller.js';
const router = express.Router();


// protected routes
router.use(authMiddleware);


// create new trades (skicka request)
router.post("/", tradeController.createTrade);
// get my requests (trades where I am the requester)
router.get("/my-requests",tradeController.getMyRequests);

// get my trades (trades where I am the owner)
router.get("/my-trades",tradeController.getMyTrades);




// accept a trade
router.put("/my-trades/:id/accept",tradeController.acceptTrade);

// reject a trade
router.put("/my-trades/:id/reject",tradeController.rejectTrade);

// cancel a trade
router.put("/my-trades/:id/cancel",tradeController.cancelTrade);

// complete a trade
router.put("/my-trades/:id/complete",tradeController.completeTrade); 




export default router;  
