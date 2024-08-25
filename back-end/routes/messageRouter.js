import express from "express";
import { createMessage } from "../controllers/messageControllers.js";

const messageRouter = express.Router();

// create a new message
messageRouter.post("/", createMessage);

export default messageRouter;
