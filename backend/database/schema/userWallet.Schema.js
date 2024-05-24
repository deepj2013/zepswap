const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    WalletAdress: {
      type: String,
      unique: true,
      indexd: true,
    },
    ZepxBalance: {
      type: mongoose.Schema.Types.Decimal128,
    },
  },
  { timestamps: true }
);

const UserWallet = mongoose.model("UserWallets", schema);
module.exports = UserWallet;
