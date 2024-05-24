const express = require("express");
const router = express.Router();
const predictionController = require("../controller/prediction.controller");
const { verifyJwtToken } = require("../utils/jwtUtlis");

// API => GET
router.get("/get-prediction-data", predictionController.getPredictionData);
// API => POST
router.post("/place-bet",verifyJwtToken,predictionController.JoinPrediction);

module.exports = router;
