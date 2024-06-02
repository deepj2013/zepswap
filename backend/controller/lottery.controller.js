const LotterySchema = require("../database/schema/lottery.Schema");
const UserWallet = require("../database/schema/userWallet.Schema");
const { catchAsync, responseObject, httpStatus } = require("../utils/helper");

const ParticipateInLottery = catchAsync(async (req, res) => {
  const { lotteryId, ticketNumbers, TicketAmount } = req.body;
  const { address } = req.userPayload;
  if(!lotteryId || !TicketAmount || !address){
    const err = responseObject(false, true, {
      message: "empty Parameters",
    });
    return res.status(httpStatus.BAD_REQUEST).json(err);
  }
  const lotteryDetails = await LotterySchema.findOne({LotteryId:lotteryId});
  if(!lotteryDetails){
    const err = responseObject(false, true, {
      message: "Lottery not exist",
    });
    return res.status(httpStatus.BAD_REQUEST).json(err);
  }
  const userWallet = await UserWallet.findOne({ WalletAdress: address });
  if (!userWallet) {
    const response = responseObject(false, true, {
      address: address,
      balance: 0,
      msg: "Insufficient Balance",
    });
    return res.status(httpStatus.NOT_ACCEPTABLE).json(response);
  }
});

const GetCurrentLotteryGame = catchAsync(async (req, res) => {});
const GetUserLotteryData = catchAsync(async (req, res) => {
  const { address } = req.userPayload;
});
const GetUserLotteryHistory = catchAsync(async (req, res) => {});
const GetUserLotteryHistoryById = catchAsync(async (req, res) => {});

module.exports = {
  ParticipateInLottery,
  GetUserLotteryData,
  GetUserLotteryHistory,
  GetCurrentLotteryGame,

  GetUserLotteryHistoryById,
};
