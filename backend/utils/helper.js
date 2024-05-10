const logErrors = require("./errorLogger");

const catchAsync = function (fn) {
  /**
   * @fn function which is wrapped by the catchAsync function to use the DRY method.
   * pass down the request, response, and the next arguments into the inner function.
   */

  return async (req, res, next) => {
    try {
      const result = await fn(req, res, next);
      // Check if the result is a promise before proceeding
      if (result && typeof result.catch === 'function') {
        await result; // Ensure any potential promise is resolved
      }
    } catch (err) {
      logErrors(err);
      console.log(err);
      return res.json("error occurred in server");
    }
  };
};

const httpStatus = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  PARTIAL_CONTENT: 206,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INVALID_INPUT: 422,
  NOT_ACCEPTABLE: 406,
  INTERNAL_SERVER: 500,
  UNAUTHORIZATION: 401,
};

const responseObject = function (success, error, options) {
  return { success, error, ...options };
};

module.exports = {
  catchAsync,
  httpStatus,
  responseObject,
};
