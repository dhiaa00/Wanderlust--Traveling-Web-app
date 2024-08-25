import Conversation from "../models/Conversation.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join a conversation room
    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
      console.log(`User joined conversation: ${conversationId}`);
    });

    // Send a message
    socket.on(
      "sendMessage",
      async ({ conversationId, sender, senderType, text }) => {
        try {
          const conversation = await Conversation.findById(conversationId);
          console.log({
            conversationId,
            sender,
            senderType,
            text,
            conversation,
          });
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
            const newConversation = new Conversation({
              participants: [sender],
              messages: [
                { sender, text, createdAt: new Date(), readStatus: false },
              ],
            });
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

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export default socketHandler;
