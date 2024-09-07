import Conversation from "../models/Conversation.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    // Join a conversation room
    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
    });

    // Send a message
    socket.on(
      "sendMessage",
      async ({ conversationId, sender, receiver, senderType, text }) => {
        console.log("sendMessage", conversationId, sender, receiver, text);
        try {
          if (text.trim() === "") {
            return;
          }
          const conversation = await Conversation.findById(conversationId);
          console.log("conversation", conversation);
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
          }
          // if the conversation does not exist, create a new one
          else {
            console.log("else");
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
            console.log("newConversation", newConversation);
            await newConversation.save();
            io.to(newConversation._id).emit(
              "newMessage",
              newConversation.messages[0]
            );
          }
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
