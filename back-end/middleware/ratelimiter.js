// middleware/rateLimiter.js

const rateLimit = require("express-rate-limit");

// Define a rate limit rule
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});

module.exports = apiLimiter;
