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
    Winner: {
      type: String,
      enum: ["GroupA", "GroupB"],
    },
    status: {
      type: String,
      enum: ["OPEN", "CLOSED", "UPCOMING"],
    },
    closingTime:{
        type:Date,
    }
  },
  { timestamps: true }
);

const PayementRequest = mongoose.model("Payements", schema);
module.exports = PayementRequest;
