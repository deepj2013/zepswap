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
      type: Number,
      default: 0,
    },
    WalletAdress: {
      type: String,
      indexd: true,
    },
    PredictedOn: {
      type: String,
      enum: ["GroupA", "GroupB"],
    },
    hash:{
        type:String
    }
  },
  { timestamps: true }
);

const PayementRequest = mongoose.model("PredictionHistory", schema);
module.exports = PayementRequest;
