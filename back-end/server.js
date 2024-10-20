import express from "express";
import dotenv from "dotenv";
import session from "express-session"; // Import express-session
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import agencyRouter from "./routes/agencyRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import offerRouter from "./routes/offerRouter.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import connectToDb from "./lib/connectToDb.js";
import notificationRouter from "./routes/notificationRouter.js";
import http from "http";
import { Server as SocketIoServer } from "socket.io";
import apiLimiter from "./middleware/ratelimiter.js";
import socketHandler from "./sockets/socketHandler.js";
import messageRouter from "./routes/messageRouter.js";
import conversationRouter from "./routes/conversationRouter.js";

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Middleware

app.use(
  cors({
    origin: [
      "https://wanderlust-e-travelling.netlify.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Set up session management
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_secret_secret_key", // Replace with your own secret
    resave: false,
    saveUninitialized: true,
  })
);

// Apply the rate limit rule to all API requests
app.use("/auth", apiLimiter, authRouter);
app.use("/user", apiLimiter, userRouter);
app.use("/agency", apiLimiter, agencyRouter);
app.use("/offer", apiLimiter, offerRouter);
app.use("/offer/review", apiLimiter, reviewRouter);
app.use("/notifications", apiLimiter, notificationRouter);
app.use("/message", apiLimiter, messageRouter);
app.use("/conversation", apiLimiter, conversationRouter);

// Connect to MongoDB
const DB_STRING_URL = process.env.DB_STRING_URL;
connectToDb(DB_STRING_URL);

// Create HTTP server
const server = http.createServer(app);

// Set up socket.io
const io = new SocketIoServer(server, {
  cors: {
    origin: [
      "https://wanderlust-e-travelling.netlify.app",
      "http://localhost:5173",
    ],
    credentials: true,
  },
});
socketHandler(io);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  // Updated to server.listen to use the correct server instance
  console.log(`Server started on port ${PORT}`);
});

export { app, server, io };
