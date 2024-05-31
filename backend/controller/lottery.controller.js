const { catchAsync, responseObject, httpStatus } = require("../utils/helper");

const GenrateTicket = catchAsync(async (req, res) => {});

const ParticipateInLottery = catchAsync(async (req, res) => {});

const GetCurrentLotteryGame = catchAsync(async (req, res) => {});
const GetUserLotteryData = catchAsync(async (req, res) => {});
const GetUserLotteryHistory = catchAsync(async (req, res) => {});
const GetUserLotteryHistoryById = catchAsync(async (req, res) => {});
const ClaimWinningAmount = catchAsync(async (req, res) => {});

module.exports = {
  GenrateTicket,
  ParticipateInLottery,
  GetUserLotteryData,
  GetUserLotteryHistory,
  GetCurrentLotteryGame,
  ClaimWinningAmount,
  GetUserLotteryHistoryById,
};
