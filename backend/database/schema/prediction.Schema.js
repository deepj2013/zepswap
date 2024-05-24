const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    PredictionId: {
      type: Number,
      unique: true,
      indexd: true,
    },
    Group_A_Amount: {
      type: Number,
      default: 0,
    },
    Group_B_Amount: {
      type: Number,
      default: 0,
    },
    Group_C_Amount: {
      type: Number,
      default: 0,
    },
    Winner: {
      type: String,
      enum: ["GroupA", "GroupB", "GroupC"],
    },
    status: {
      type: String,
      enum: ["OPEN", "CLOSED", "UPCOMING"],
    },
    TotalAmount: {
      type: Number,
      default:0
    },
    TotalUserParticipated: {
      type: Number,
      default: 0,
    },
    closingTime: {
      type: Date,
    },
    openingTime:{
      type:Date
    }
  },
  { timestamps: true }
);

const PayementRequest = mongoose.model("PridictionData", schema);
module.exports = PayementRequest;
