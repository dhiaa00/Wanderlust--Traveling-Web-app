// middleware/rateLimiter.js

import rateLimit from "express-rate-limit";

// Define a rate limit rule
const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10000, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 5 minutes",
});

export default apiLimiter;
