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

// ... other imports and middleware

const app = express();

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

dotenv.config();

connectToDb(process.env.DB_STRING_URL);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("listening on port ", PORT);
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/agency", agencyRouter);
app.use("/offer", offerRouter);
app.use("/offer/review", reviewRouter);


// slimen
/*
// server.js or app.js (main server file)
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

module.exports = { app, server, io };

// server.js or app.js (main server file)
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { app, server } = require('./server');
const notificationsRouter = require('./routes/notifications');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', notificationsRouter);

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server started on port ${port}`));

*\
