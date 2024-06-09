const mongoose = require('mongoose');

const lotteryResultSchema = new mongoose.Schema({
  LotteryId: {
    type: Number,
    required: true,
  },
  DrawDate: {
    type: Date,
    required: true,
  },
  Jackpot: {
    type: Number,
    required: true,
  },
  Levels: [
    {
      Level: Number,
      LotteryNumbers: [String],
    },
  ],
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const LotteryResult = mongoose.model('LotteryResult', lotteryResultSchema);

module.exports = LotteryResult;
