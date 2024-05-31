const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    LotteryId: {
      type: Number,
      unique: true,
      indexd: true,
    },
    TicketId: {
      type: Number,
      indexd: true,
      default: 0,
    },
    WalletAdress: {
      type: Number,
      default: 0,
    },
    PaymentHash: {
      type: String,
    },
  },
  { timestamps: true }
);

const PayementRequest = mongoose.model("lotterTickets", schema);
module.exports = PayementRequest;
