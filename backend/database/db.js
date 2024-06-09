const mongoose = require("mongoose");
const mongodbUri =
  // "mongodb+srv://shiva:77395644@cluster0.3glqe9i.mongodb.net/zepswap-beta";
  // "mongodb://zepswap:zepxcash_adm_in%4033@62.72.59.223:27017/zepswap?authSource=zepswap"
  "mongodb://zepswap:zepxcash_adm_in%4033@62.72.59.223:27017/zepswap"

const databaseConnection = function (callback) {
  mongoose
    .connect(mongodbUri)
    .then((res) => {
      console.log("database connected");
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = databaseConnection;
