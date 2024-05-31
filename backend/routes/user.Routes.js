const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller");
const { verifyJwtToken } = require("../utils/jwtUtlis");

// API => GET
router.get("/balance",verifyJwtToken,UserController.getBalance);
router.get("/transactions",verifyJwtToken,UserController.getTransactions);
router.get("/predictionsHistory",verifyJwtToken,UserController.predictionHistory);
router.get("/LotteryHistory",verifyJwtToken,UserController.lotteryHistory);

// API => POST
router.post("/login",UserController.Login);
router.post("/recharge",verifyJwtToken,UserController.rechargeWallet);
router.post("/withdraw",verifyJwtToken,UserController.withdrawZepx);

module.exports = router;
