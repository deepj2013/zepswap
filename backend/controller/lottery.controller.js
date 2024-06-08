const LotterySchema = require("../database/schema/lottery.Schema");
const LotteryTicketsSchema = require("../database/schema/lotteryTicket.Schema");
const UserWallet = require("../database/schema/userWallet.Schema");
const { catchAsync, responseObject, httpStatus } = require("../utils/helper");
const {
  generateLotteryTicket,
  validateTickets,
} = require("../utils/lotteryUtils");

const ParticipateInLottery = catchAsync(async (req, res) => {
  const { lotteryId, ticketNumbers, TicketAmount } = req.body;
  const { address } = req.userPayload;
  if (!lotteryId || !TicketAmount || !address) {
    const err = responseObject(false, true, {
      message: "empty Parameters",
    });
    return res.status(httpStatus.BAD_REQUEST).json(err);
  }
  if (!Array.isArray(ticketNumbers)) {
    const err = responseObject(false, true, {
      message: "Lottery tickets should be array",
    });
    return res.status(httpStatus.BAD_REQUEST).json(err);
  }
  const lotteryDetails = await LotterySchema.findOne({ LotteryId: lotteryId });
  if (!lotteryDetails) {
    const err = responseObject(false, true, {
      message: "Lottery not exist",
    });
    return res.status(httpStatus.BAD_REQUEST).json(err);
  }
  let existingTickets = lotteryDetails.tickets || [];
  let tickets = ticketNumbers;

  if (ticketNumbers.length === 0) {
    for (let i = 0; i < TicketAmount; i++) {
      let newTicket = generateLotteryTicket(existingTickets);
      let validationResult = validateTickets([newTicket], existingTickets);
      if (validationResult.valid) {
        tickets.push(newTicket);
        existingTickets.push(newTicket);
      } else {
        i--;
      }
    }
  } else {
    let validationResult = validateTickets(tickets, existingTickets);
    if (!validationResult.valid) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(
          responseObject(false, true, { message: validationResult.message })
        );
    }
  }
  lotteryDetails.tickets = existingTickets;
  await lotteryDetails.save();

  const userWallet = await UserWallet.findOne({ WalletAdress: address });
  if (!userWallet) {
    const response = responseObject(false, true, {
      address: address,
      balance: 0,
      msg: "Insufficient Balance",
    });
    return res.status(httpStatus.NOT_ACCEPTABLE).json(response);
  }
  if (
    Number(userWallet.ZepxBalance) <
    TicketAmount * lotteryDetails.TicketPrice
  ) {
    const response = responseObject(false, true, {
      address: address,
      balance: Number(userWallet.ZepxBalance),
      msg: "Insufficient Balance",
    });
    return res.status(httpStatus.NOT_ACCEPTABLE).json(response);
  }
  userWallet.ZepxBalance =
    Number(userWallet.ZepxBalance) - TicketAmount * lotteryDetails.TicketPrice;
  await userWallet.save();
  for (const ticket of tickets) {
    const newTicket = new LotteryTicketsSchema({
      LotteryId: lotteryId,
      TicketId: ticket,
      WalletAdress: address,
    });
    await newTicket.save();
  }
  const successResponse = responseObject(true, false, {
    message: "Participated succesfully",
    lotteryId: lotteryId,
    tickets: tickets,
  });

  return res.status(httpStatus.CREATED).json(successResponse);
});

const createNewLottery = catchAsync(async (req, res) => {
  const { secretId, ticketPrice, closingTime } = req.body;
  if (secretId !== "zepswap@321") {
    const err = responseObject(false, true, {
      message: "UNAUTHORIZAED",
    });
    return res.status(httpStatus.UNAUTHORIZATION).json(err);
  }
  const count = await LotterySchema.countDocuments();
  const lotteryId = count + 1;
  const closingDate = new Date();
  closingDate.setDate(closingDate.getDate() + closingTime);
  const lottery = new LotterySchema({
    LotteryId: lotteryId,
    TicketPrice: ticketPrice,
    closingTime: closingDate.getTime(),
  });
  await lottery.save();
  const successResponse = responseObject(true, false, {
    message: "Lottery created successfully",
    lotteryId: lotteryId,
    ticketPrice: ticketPrice,
    closingTime: closingDate.getTime(),
  });

  return res.status(httpStatus.CREATED).json(successResponse);
});

const GetCurrentLotteryGame = catchAsync(async (req, res) => {
  try {
    // Fetch the latest 3 lotteries sorted by creation date in descending order
    const latestLotteries = await LotterySchema.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select("LotteryId TicketPrice closingTime");

    if (!latestLotteries || latestLotteries.length === 0) {
      const err = responseObject(false, true, {
        message: "No lotteries found",
      });
      return res.status(httpStatus.NOT_FOUND).json(err);
    }

    const successResponse = responseObject(true, false, {
      message: "Latest lotteries retrieved successfully",
      lotteries: latestLotteries,
    });

    return res.status(httpStatus.OK).json(successResponse);
  } catch (error) {
    const err = responseObject(false, true, {
      message: "Error retrieving lotteries",
      error: error.message,
    });
    return res.status(httpStatus.INTERNAL_SERVER).json(err);
  }
});

const GetUserLotteryData = catchAsync(async (req, res) => {
  const { lotteryId } = req.body;
  const { address } = req.userPayload;

  if (!lotteryId || !address) {
    const err = responseObject(false, true, {
      message: "Lottery ID and user address are required",
    });
    return res.status(httpStatus.BAD_REQUEST).json(err);
  }

  try {
    const userLotteryData = await LotteryTicketsSchema.find({
      LotteryId: lotteryId,
      WalletAdress: address,
    });

    if (!userLotteryData || userLotteryData.length === 0) {
      const err = responseObject(true, false, {
        message: "No lottery data found for the specified lottery and user",
        userLotteryData: [],

      });
      return res.status(httpStatus.OK).json(err);
    }

    const successResponse = responseObject(true, false, {
      message: "User lottery data retrieved successfully",
      userLotteryData: userLotteryData,
    });

    return res.status(httpStatus.OK).json(successResponse);
  } catch (error) {
    const err = responseObject(false, true, {
      message: "Error retrieving user lottery data",
      error: error.message,
    });
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
  }
});

const GetUserLotteryHistory = catchAsync(async (req, res) => {});
const GetUserLotteryHistoryById = catchAsync(async (req, res) => {});

module.exports = {
  ParticipateInLottery,
  GetUserLotteryData,
  GetUserLotteryHistory,
  GetCurrentLotteryGame,
  createNewLottery,
  GetUserLotteryHistoryById,
};
