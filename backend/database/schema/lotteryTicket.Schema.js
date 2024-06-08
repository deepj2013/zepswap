const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    LotteryId: {
      type: Number,
      indexd: true,
    },
    TicketId: {
      type: String,
      indexd: true,
      default: 0,
    },
    WalletAdress: {
      type: String,
      indexd: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const LotteryTicketsSchema = mongoose.model("lotterTickets", schema);
module.exports = LotteryTicketsSchema;
