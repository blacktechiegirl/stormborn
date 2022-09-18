const AppError = require("../utils/AppError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const message = `This User already exists. Please Login!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  return new AppError("Invalid token. Please log in again!", 401);
};

const handleJWTExpiredError = () => {
  return new AppError("Your token has expired! Please log in again.", 401);
};

const handleDevError = (err, req, res) => {
  res.status(err.statuscode).json({
    status: err.status,
    message: err.message,
    err: err,
    stack: err.stack,
  });
};

const handleProdError = (err, req, res) => {
  if (err.operational) {
    res.status(err.statuscode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(err.statuscode).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "dev") {
    handleDevError(err, req, res);
  } else if (process.env.NODE_ENV === "prod") {
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;

    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    handleProdError(error, req, res, next);
  }
};

module.exports = globalErrorHandler;
