const express = require("express");
const router = express.Router();
const lotteryController = require("../controller/lottery.controller")

// API => GET
router.get("/live-lottery",lotteryController.GetCurrentLotteryGame);
router.get("/user-lottery-info",lotteryController.GetUserLotteryData);
router.get("/user-lottery-history",lotteryController.GetUserLotteryHistory);
router.get("/user-lottery-history/:id",lotteryController.GetUserLotteryHistoryById);

// API => POST
router.post("/join-lottery",lotteryController.ParticipateInLottery);




module.exports = router;
