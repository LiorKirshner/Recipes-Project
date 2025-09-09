// utils/rateLimiter.js
// Express rate limiting middleware for the API

const rateLimit = require("express-rate-limit");

const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    status: 429,
    error: "Too many requests, please try again later.",
  },
});

module.exports = apiRateLimiter;
