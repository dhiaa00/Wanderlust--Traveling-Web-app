import Conversation from "../models/Conversation.js";

const createMessage = async (req, res) => {
  const { conversationId, senderId, content } = req.body;
  try {
    const newMessage = {
      sender: senderId,
      content,
      timestamp: new Date(),
    };

    const conversation = await Conversation.findById(conversationId);
    conversation.messages.push(newMessage);
    await conversation.save();

    res.status(201).json({ message: "Message created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createMessage };
