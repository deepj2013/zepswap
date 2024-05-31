require('dotenv').config();
const jwt = require("jsonwebtoken");
const { httpStatus } = require("./helper");

const getUserTokenInfromation = function (req) {
  /**
   * @param authToken check user authorization token
   * if the token is expire then send back the 401 error.
   * also check the user has valid token or not.
   */
  const authToken = req.headers["authorization"];
  if (!authToken) {
    return {
      error: true,
      success: false,
      message: "Unauthrization",
      status: httpStatus.UNAUTHORIZATION,
    };
  }
  const token = authToken.split(" ")[1];
  // if user is not valid then send back the error
  if (!token) {
    return {
      error: true,
      success: false,
      message: "Unauthrization",
      status: httpStatus.UNAUTHORIZATION,
    };
  }
  return token;
};

const verifyJwtToken = function (req, res, next) {
  const headersVarifyData = getUserTokenInfromation(req, res);
  console.log(headersVarifyData, "asdfadsf");
  if (!!headersVarifyData?.error && !headersVarifyData?.success) {
    console.log("token is not append in headers");

    return res.status(headersVarifyData?.status).json(headersVarifyData);
  }

  jwt.verify(headersVarifyData, "jwtsecrettoken", (err, payload) => {
    if (err) {
      console.log("token error", err);

      const sendObject = {
        error: true,
        message: "Unauthorized",
        status: httpStatus.UNAUTHORIZATION,
      };
      if (req.headers.varification) {
        sendObject.message = "Otp expire";
      }
      return res.status(httpStatus.UNAUTHORIZATION).json(sendObject);
    }

    console.log(payload, "token payload");

    req.userPayload = payload;
    next();
  });
};

const createJwtToken = async (payload) => {
  const secret = "jwtsecrettoken";
  console.log("secret key", secret);
  return jwt.sign(payload, secret, { expiresIn: "2d" });
};

const createRefreshToken = async (payload) => {
  const secret = "apireferstoken";
  console.log("secret key", secret);
  return jwt.sign(payload, secret, { expiresIn: "30d" });
};

const verifyRefreshToken = (token) => {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  return jwt.verify(token, secret);
};

module.exports = {
  verifyJwtToken,
  createJwtToken,
  createRefreshToken,
  verifyRefreshToken,
};