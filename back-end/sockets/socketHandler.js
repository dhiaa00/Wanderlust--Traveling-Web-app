import { Agency } from "../models/Agency.js";
import Conversation from "../models/Conversation.js";
import { Notification } from "../models/Notification.js";
import { User } from "../models/User.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    // Join a notification room by userid
    socket.on("joinNotifications", (userId) => {
      socket.join(userId);
    });
    socket.on("newReview", (notification) => {
      io.to(notification.userId).emit("newNotification", notification);
    });
    // Join a conversation room
    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
    });

    // Send a message
    socket.on(
      "sendMessage",
      async ({ conversationId, sender, receiver, senderType, text }) => {
        try {
          if (text.trim() === "") {
            return;
          }
          const conversation = await Conversation.findById(conversationId);
          const senderOb =
            senderType == "user"
              ? await User.findById(sender)
              : await Agency.findById(sender);
          const senderName =
            senderType == "user" ? senderOb.username : senderOb.agencyName;

          const notification = new Notification({
            type: "NEW_MESSAGE",
            userId: receiver,
            message: `${senderName} sent you a message`,
            link: `conversation/${conversationId}`,
          });
          await notification.save();
          if (conversation) {
            const newMessage = {
              sender,
              senderType: senderType,
              content: text,
              createdAt: new Date(),
              readStatus: false,
            };
            conversation.messages.push(newMessage);
            await conversation.save();

            // broadcast the new message to all participants except the sender
            socket.broadcast.to(conversationId).emit("newMessage", newMessage);

            if (receiver) {
              // get username
              socket.to(receiver).emit("newNotification", notification);
            } else {
              const rec = conversation.participants.find(
                (participant) => participant !== sender
              );
              socket.to(rec).emit("newNotification", notification);
            }
          }
          // if the conversation does not exist, create a new one
          else {
            if (senderType === "agency") {
              return;
            }
            const newConversation =
              text !== ""
                ? new Conversation({
                    participants: [sender, receiver],
                    messages: [
                      {
                        sender,
                        senderType,
                        text,
                        createdAt: new Date(),
                        readStatus: false,
                      },
                    ],
                  })
                : new Conversation({
                    participants: [sender, receiver],
                    messages: [
                      {
                        receiver,
                        senderType: "agency",
                        content: "Hi, how can we help you?",
                        createdAt: new Date(),
                        readStatus: false,
                      },
                    ],
                  });
            text !== "" &&
              socket.to(receiver).emit("newNotification", notification);
            await newConversation.save();
            io.to(newConversation._id).emit(
              "newMessage",
              newConversation.messages[0]
            );
          }
          console.log(`${senderName} sent a message`);
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }
    );

    // Update message read status
    socket.on(
      "updateReadStatus",
      async ({ conversationId, messageId, readerId }) => {
        try {
          const conversation = await Conversation.findOneAndUpdate(
            { _id: conversationId, "messages._id": messageId },
            { $set: { "messages.$.readStatus": true } },
            { new: true }
          );

          if (conversation) {
            const updatedMessage = conversation.messages.id(messageId);
            io.to(conversationId).emit("messageRead", { messageId, readerId });
          }
        } catch (error) {
          console.error("Error updating read status:", error);
        }
      }
    );

    socket.on("disconnect", () => {});
  });
};

export default socketHandler;
