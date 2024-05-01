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
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
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
