const errorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    const message = `Resources not found with this id. Invalid ${err.path}`;
    err = new errorHandler(message, 400);
  }

  if (err.name === 11000) {
    const message = `Duplicate Key ${Object.keys(err.keyValue)} Entered`
    err = new errorHandler(message, 400);
  }

  if (err.name === "JsonWebError") {
    const message = `Your URL is invalid. Please try again later.`;
    err = new errorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Your URL is expired. Please try again later`;
    err = new errorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

module.exports = errorHandler