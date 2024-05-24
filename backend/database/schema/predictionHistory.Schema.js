const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    PredictionId: {
      type: Number,
      unique: true,
      indexd: true,
    },
    Amount: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0,
    },
    WalletAdress: {
      type: String,
      indexd: true,
    },
    PredictedOn: {
      type: String,
      enum: ["UP", "DOWN","HOLD" ],
    },
    hash:{
        type:String
    },
    winning:{
      type:Boolean,
    },
    winningAmount:{
      type: mongoose.Schema.Types.Decimal128,
      default:0
    }
  },
  { timestamps: true }
);

const PredictionHistory = mongoose.model("PredictionHistory", schema);
module.exports = PredictionHistory;
