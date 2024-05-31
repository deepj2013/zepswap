const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    userAdress: {
      type: String,
    },
    reciverAdress: {
      type: String,
    },
    amount: {
      type: Number,
    },
    network: {
      type: String,
    },
    tokenName: {
      type: String,
    },
    tokenAdress: {
      type: String,
    },
    hash: {
      type: String,
      unique: true,
      indexed: true,
    },
    for: {
      type: String,
      enum: ["LOTTERY", "PREDICTION"],
      indexed: true,
    },
  },
  { timestamps: true }
);

const PayementRequest = mongoose.model("Payements", schema);
module.exports = PayementRequest;
