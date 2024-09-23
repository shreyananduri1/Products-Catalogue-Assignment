const { constants } = require("../constants");

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: error.message,
        stackTrace: error.stack,
      });

      break;
    case constants.UNAUTHORIZED_ACCESS:
      res.json({
        title: "Unauthorized",
        message: error.message,
        stackTrace: error.stack,
      });

      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: error.message,
        stackTrace: error.stack,
      });

      break;
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Error",
        message: error.message,
        stackTrace: error.stack,
      });

      break;

    case 400:
      res.json({
        title: "Not Found",
        message: error.message,
        stackTrace: error.stack,
      });

      break;

    case constants.SERVER_ERROR:
      res.json({
        title: "Internal Server Error",
        message: error.message,
        stackTrace: error.stack,
      });

      break;

    default:
      res.json({ message: "No Error" });
      break;
  }
  res.json({
    title: "Not Found",
    message: error.message,
    stackTrace: error.stack,
  });
  res.json({
    title: "Validation Error",
    message: error.message,
    stackTrace: error.stack,
  });
};

module.exports = { errorHandler };
