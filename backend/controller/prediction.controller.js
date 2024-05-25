const PredictionHistory = require("../database/schema/predictionHistory.Schema");
const PredictionHistorySchema = require("../database/schema/predictionHistory.Schema");
const UserWallet = require("../database/schema/userWallet.Schema");
const {
  joinPredictionInternal,
  getPredictionDataInternal,
} = require("../services/prediction.services");
const { catchAsync, responseObject, httpStatus } = require("../utils/helper");

const JoinPrediction = catchAsync(async (req, res) => {
  const { predictionId, amount, predictionType } = req.body;
  const { address } = req.userPayload;
  if (!address || !predictionId || !amount || !predictionType) {
    const err = responseObject(false, true, {
      message: "empty Parameters",
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

  if (Number(userWallet.ZepxBalance) < amount) {
    const response = responseObject(false, true, {
      address: address,
      balance: userWallet.ZepxBalance,
      msg: "Insufficient Balance",
    });
    return res.status(httpStatus.NOT_ACCEPTABLE).json(response);
  }

  const joiningStatus = await joinPredictionInternal(
    predictionId,
    amount,
    address,
    predictionType
  );
  if (joiningStatus.succes) {
    userWallet.ZepxBalance = Number(userWallet.ZepxBalance) - amount;
    await userWallet.save();
    const saveHistory = new PredictionHistorySchema({
      PredictionId: predictionId,
      Amount: amount,
      WalletAdress: address,
      PredictedOn: predictionType,
    });
    await saveHistory.save();
    const response = responseObject(true, false, {
      address: address,
      balance: userWallet.ZepxBalance,
      msg: "Bet Placed Succesfully",
    });
    return res.status(httpStatus.OK).json(response);
  }
  const response = responseObject(false, true, {
    address: address,
    balance: userWallet.ZepxBalance,
    msg: joiningStatus.msg,
  });
  return res.status(httpStatus.NOT_ACCEPTABLE).json(response);
});

const getPredictionData = catchAsync(async (req, res) => {
  const data = getPredictionDataInternal();
  const response = responseObject(true, false, {
    ...data,
    msg: "prediction data",
  });
  return res.status(httpStatus.OK).json(response);
});

const getPredictionHistory = catchAsync(async (req, res) => {
  const { address } = req.userPayload;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const type = req.query.type || "ALL";
  const skip = (page - 1) * limit;
  if (!address) {
    const err = responseObject(false, true, {
      message: "empty Parameters",
    });
    return res.status(httpStatus.BAD_REQUEST).json(err);
  }
  const filter = {
    WalletAdress: address,
    type: type,
  };

  if (type === "ALL") {
    delete filter.type;
  }

  const matchQuery = {
    ...filter,
  };
  const count = await PredictionHistory.countDocuments(matchQuery);
  const history = await PredictionHistory.aggregate([
    {
      $match: matchQuery,
    },
    {
      $sort: { updatedAt: -1 },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },

    {
      $project: {
        _id: 0,
      },
    },
  ]);
  const response = responseObject(true, false, {
    address: address,
    history: history,
    totalPages: Math.ceil(count / limit),
    msg: "predictions history",
  });
  return res.status(httpStatus.OK).json(response);
});

module.exports = {
  JoinPrediction,
  getPredictionData,
  getPredictionHistory
};
