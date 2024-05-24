const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    WalletAdress: {
      type: String,
      indexd: true,
    },
    amount: {
      type: mongoose.Schema.Types.Decimal128,
    },
    type: {
      type: String,
      enum: ["WITHDRAWL", "DEPOSITE"],
    },
    status: {
      type: String,
      enum: ["SUCCESS", "FAILED", "PENDING"],
    },
    hash:{
        type: String,
    }
  },
  { timestamps: true }
);

const UserTransactions = mongoose.model("UserTransactions", schema);
module.exports = UserTransactions;
