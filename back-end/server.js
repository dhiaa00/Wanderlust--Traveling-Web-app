import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import agencyRouter from "./routes/agencyRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import offerRouter from "./routes/offerRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToDb from "./lib/connectToDb.js";
// import notificationRouter from "./routes/notifications.js";
// import http from "http";
// import { Server as SocketIoServer } from "socket.io";

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

// Connect to MongoDB
const DB_STRING_URL = process.env.DB_STRING_URL;
connectToDb(DB_STRING_URL);

// Define routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/agency", agencyRouter);
app.use("/offer", offerRouter);
app.use("/offer/review", reviewRouter);
// app.use("/notifications", notificationRouter);

// Create HTTP server
// const server = http.createServer(app);

// Set up socket.io
// const io = new SocketIoServer(server);
// io.on("connection", (socket) => {
//   console.log("A user connected");
//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// export { app, server, io };
