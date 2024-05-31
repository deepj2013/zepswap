const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    upWinningMultipler: {
      type: Number,
      default: 1.8,
    },
    downWinningMultipler: {
      type: Number,
      default: 1.8,
    },
    holdWinningMultipler: {
      type: Number,
      default: 1.8,
    },
    maximumPredictionAmount: {
      type: mongoose.Schema.Types.Decimal128,
      default: "10000000000000000000000000",
    },
    minimumPredictionAmount: {
      type: mongoose.Schema.Types.Decimal128,
      default: "0",
    },
  },
  { timestamps: true }
);

const PredictionSetting = mongoose.model("PredictionSetting", schema);
module.exports = PredictionSetting;
