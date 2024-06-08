const express = require("express");
const router = express.Router();
const { verifyJwtToken } = require("../utils/jwtUtlis");
const lotteryController = require("../controller/lottery.controller")

// API => GET
router.get("/live-lottery",lotteryController.GetCurrentLotteryGame);
router.post("/user-lottery-tickets",verifyJwtToken,lotteryController.GetUserLotteryData);
router.get("/user-lottery-history",lotteryController.GetUserLotteryHistory);
router.get("/user-lottery-history/:id",lotteryController.GetUserLotteryHistoryById);

// API => POST
router.post("/participate-lottery",verifyJwtToken,lotteryController.ParticipateInLottery);
router.post("/create-new-lottery",lotteryController.createNewLottery)




module.exports = router;
