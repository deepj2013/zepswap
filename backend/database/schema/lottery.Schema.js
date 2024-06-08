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
    TicketPrice:{
      type:Number,
      default:0
    },
    Winners: {
      type: Array,
    },
    tickets:[],
    closingTime: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const LotterySchema = mongoose.model("Lottery", schema);
module.exports = LotterySchema;
