// Centralized error handling middleware
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: true,
    message: err.message || "Internal Server Error",
    statusCode,
  });
}

module.exports = errorHandler;
