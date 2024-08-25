import { Agency } from "../models/Agency.js";
import Conversation from "../models/Conversation.js";
import { User } from "../models/User.js";

const getConversations = async (req, res) => {
  const { userId } = req.params;
  try {
    const conversations = await Conversation.find({
      participants: userId,
    });

    // include the info of the other participant in each conversation and the latest message
    const conversationsWithInfo = await Promise.all(
      conversations.map(async (conversation) => {
        const otherParticipantId = conversation.participants.find(
          (participantId) => participantId.toString() !== userId
        );

        const latestMessage =
          conversation.messages[conversation.messages.length - 1];
        let otherParticipant = await User.findById(otherParticipantId);
        if (!otherParticipant) {
          otherParticipant = await Agency.findById(otherParticipantId);
          return {
            conversationId: conversation._id,
            otherParticipant: {
              id: otherParticipant._id,
              username: otherParticipant.agencyName,
              profilePhoto: otherParticipant.agencyPhoto,
            },
            latestMessage: {
              content: latestMessage.content,
              timestamp: latestMessage.timestamp,
            },
          };
        }

        return {
          conversationId: conversation._id,
          otherParticipant: {
            id: otherParticipant._id,
            username: otherParticipant.username,
            profilePhoto: otherParticipant.profilePhoto,
          },
          latestMessage: {
            content: latestMessage.content,
            timestamp: latestMessage.timestamp,
          },
        };
      })
    );

    res.status(200).json({
      message: "Conversations fetched successfully",
      conversations: conversationsWithInfo,
    });
  } catch (error) {
    console.log("getConversations", error);
    res.status(500).json({ message: error.message });
  }
};

const getConversationById = async (req, res) => {
  const { id } = req.params;
  try {
    const conversation = await Conversation.findById(id);
    // include the info of the other participant in the conversation
    const otherParticipantId = conversation.participants.find(
      (participantId) => participantId.toString() !== req.body.userId
    );
    let otherParticipant = await User.findById(otherParticipantId);
    if (!otherParticipant) {
      otherParticipant = await Agency.findById(otherParticipantId);
      otherParticipant = {
        id: otherParticipant._id,
        username: otherParticipant.agencyName,
        email: otherParticipant.email,
        profilePhoto: otherParticipant.agencyPhoto,
      };
    } else {
      otherParticipant = {
        id: otherParticipant._id,
        username: otherParticipant.username,
        email: otherParticipant.email,
        profilePhoto: otherParticipant.profilePhoto,
      };
    }

    res.status(200).json({
      message: "Conversation fetched successfully",
      conversation: { ...conversation._doc, otherParticipant },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export { getConversations, getConversationById };
