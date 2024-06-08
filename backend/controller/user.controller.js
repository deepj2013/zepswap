const UserTransactions = require("../database/schema/transaction.Schema");
const UserWallet = require("../database/schema/userWallet.Schema");
const { catchAsync, responseObject, httpStatus } = require("../utils/helper");
const { createJwtToken } = require("../utils/jwtUtlis");
const mongoose = require("mongoose");
const { Decimal128 } = mongoose.Types;

const rechargeWallet = catchAsync(async (req, res) => {
  
  const { address } = req.userPayload;

  const { amount } = req.body;
  if (!address) {
    const err = responseObject(false, true, {
      message: "empty address",
    });
    return res.status(httpStatus.BAD_REQUEST).json(err);
  }

  const userWallet = await UserWallet.findOne({ WalletAdress: address });
  if (!userWallet) {
    const newWallet = new UserWallet();
    newWallet.WalletAdress = address;
    newWallet.ZepxBalance = amount;
    newWallet.save();
    const response = responseObject(true, false, {
      address: address,
      balance: amount,
      msg: "recharged succesfully",
    });
    return res.status(httpStatus.OK).json(response);
  }
  userWallet.ZepxBalance = Number(userWallet.ZepxBalance) + Number(amount);
  userWallet.save();
  const transaction = new UserTransactions({
    WalletAdress: address,
    amount: amount,
    type: "DEPOSITE",
    status: "SUCCESS",
  });
  transaction.save();
  const response = responseObject(true, false, {
    address: address,
    balance: Number(userWallet.ZepxBalance),
    msg: "recharged succesfully",
  });
  return res.status(httpStatus.OK).json(response);
});

const Login = catchAsync(async (req, res) => {
  const { address } = req.body;
  if (!address) {
    const err = responseObject(false, true, {
      message: "empty address",
    });
    return res.status(httpStatus.BAD_REQUEST).json(err);
  }
  const jwt = await createJwtToken({ address: address });
  const response = responseObject(true, false, {
    address: address,
    jwt: jwt,
  });
  return res.status(httpStatus.OK).json(response);
});

const getBalance = catchAsync(async (req, res) => {
  const { address } = req.userPayload;
  if (!address) {
    const err = responseObject(false, true, {
      message: "unathurized address",
    });
    return res.status(httpStatus.BAD_REQUEST).json(err);
  }
  const userWallet = await UserWallet.findOne({ WalletAdress: address });
  if (!userWallet) {
    const response = responseObject(true, false, {
      address: address,
      balance: 0,
    });
    return res.status(httpStatus.OK).json(response);
  }
  const response = responseObject(true, false, {
    address: address,
    balance: Number(userWallet.ZepxBalance),
  });
  return res.status(httpStatus.OK).json(response);
});

const predictionHistory = catchAsync(async (req, res) => {
  const { address } = req.userPayload;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const skip = (page - 1) * limit;
  if (!address) {
    const err = responseObject(false, true, {
      message: "empty address",
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
  const count = await UserTransactions.countDocuments(matchQuery);
  const transactions = await UserTransactions.aggregate([
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
  ]);
  const response = responseObject(true, false, {
    address: address,
    transactions: transactions,
    totalPages: Math.ceil(count / limit),
    msg: "transactions",
  });
  return res.status(httpStatus.OK).json(response);
});

const lotteryHistory = catchAsync(async (req, res) => {
  const { address } = req.userPayload;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const skip = (page - 1) * limit;
  if (!address) {
    const err = responseObject(false, true, {
      message: "empty address",
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
  const count = await UserTransactions.countDocuments(matchQuery);
  const transactions = await UserTransactions.aggregate([
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
  ]);
  const response = responseObject(true, false, {
    address: address,
    transactions: transactions,
    totalPages: Math.ceil(count / limit),
    msg: "transactions",
  });
  return res.status(httpStatus.OK).json(response);
});

const withdrawZepx = catchAsync(async (req, res) => {
  const { address } = req.userPayload;
  const { amount } = req.body;
  if (!address) {
    const err = responseObject(false, true, {
      message: "empty address",
    });
    return res.status(httpStatus.BAD_REQUEST).json(err);
  }

  const userWallet = await UserWallet.findOne({ WalletAdress: address });
  if (!userWallet) {
    const err = responseObject(false, true, {
      message: "wallet not found",
    });
    return res.status(httpStatus.BAD_REQUEST).json(err);
  }
  if (userWallet.ZepxBalance < amount) {
    const err = responseObject(false, true, {
      message: "insufficient balance",
    });
    return res.status(httpStatus.BAD_REQUEST).json(err);
  }
  userWallet.ZepxBalance = Number(userWallet.ZepxBalance) - amount;
  userWallet.save();
  const transaction = new UserTransactions({
    WalletAdress: address,
    amount: amount,
    type: "WITHDRAWL",
    status: "PENDING",
  });
  transaction.save();
  const response = responseObject(true, false, {
    address: address,
    balance: Number(userWallet.ZepxBalance),
    msg: "withdrawl succesfully",
  });
  return res.status(httpStatus.OK).json(response);
});

const getTransactions = catchAsync(async (req, res) => {
  const { address } = req.userPayload;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const type = req.query.type || "ALL";
  const skip = (page - 1) * limit;
  if (!address) {
    const err = responseObject(false, true, {
      message: "empty address",
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
  const count = await UserTransactions.countDocuments(matchQuery);
  const transactions = await UserTransactions.aggregate([
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
      $addFields: {
        amount: { $toString: "$amount" },
      },
    },
    {
      $project: {
        type: 1,
        status: 1,
        amount: { $toDouble: "$amount" },
      },
    },
  ]);
  const response = responseObject(true, false, {
    address: address,
    transactions: transactions,
    totalPages: Math.ceil(count / limit),
    msg: "transactions",
  });
  return res.status(httpStatus.OK).json(response);
});

module.exports = {
  rechargeWallet,
  Login,
  getBalance,
  predictionHistory,
  lotteryHistory,
  withdrawZepx,
  getTransactions,
};
