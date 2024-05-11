const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    LotteryId: {
      type: Number,
      unique: true,
      indexd: true,
    },
    TotalAmount: {
      type: Number,
      default: 0,
    },
    Winners: {
      type: Array,
    },
    closingTime: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const PayementRequest = mongoose.model("Payements", schema);
module.exports = PayementRequest;
