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
      type: String,
      indexd: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const LotteryTicketsSchema = mongoose.model("lotterTickets", schema);
module.exports = LotteryTicketsSchema;
