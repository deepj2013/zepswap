const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    PredictionId: {
      type: Number,
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
      default:false
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
