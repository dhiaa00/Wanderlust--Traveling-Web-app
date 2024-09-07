import express from "express";
import {
  getConversations,
  getConversationById,
  createConversation,
} from "../controllers/conversationControllers.js";

const router = express.Router();

// Create a new conversation
router.post("/", createConversation);

// Get all conversations for a user
router.get("/:userId", getConversations);

// Get a specific conversation by ID
router.post("/get/:id", getConversationById);

export default router;
