const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  Address: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const predictionSubSchema = new Schema({
  TotalAmount: {
    type: Number,
    default: 0,
  },
  TotalParticipatedUsers: {
    type: Number,
    default: 0,
  },
});

const predictionSchema = new Schema(
  {
    id: {
      type: Number,
      // index: true,
      // unique: true,
    },
    PredictionUp: {
      type: predictionSubSchema,
      default: () => ({}),
    },
    PredictionDown: {
      type: predictionSubSchema,
      default: () => ({}),
    },
    PredictionHold: {
      type: predictionSubSchema,
      default: () => ({}),
    },
    ParticpatedUsers: {
      type: [userSchema],
      default: [],
    },
    startingTimestamp: {
      type: Number,
      default: 0,
    },
    endingTimestamp: {
      type: Number,
      default: 0,
    },
    TotalParticipatedUser: {
      type: Number,
      default: 0,
    },
    TotalAmount: {
      type: Number,
      default: 0,
    },
    Winner: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const PredictionDataSchema = mongoose.model("PredictionData", predictionSchema);
module.exports = PredictionDataSchema;
