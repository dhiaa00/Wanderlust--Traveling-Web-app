import express from "express";
import { Notification } from "../models/Notification";
// import Message from '../models/Message';
import { Comment } from "../models/Comment";
import { Post } from "../models/Post";
import { io } from "../server";

// routes/notifications.js
const notificationRouter = express.Router();

notificationRouter.get("/", async (req, res) => {
  const userId = req.query.userId;
  const notifications = await Notification.find({ userId });
  res.json(notifications);
});

notificationRouter.post("/", async (req, res) => {
  const { type, message, userId } = req.body;
  const notification = new Notification({ type, message, userId });
  await notification.save();
  io.emit(`notification-${userId}`, notification);
  res.json({ message: "Notification envoyée avec succès", notification });
});

notificationRouter.get("/unread", async (req, res) => {
  const userId = req.query.userId;
  const notifications = await Notification.find({ userId, isRead: false });
  res.json(notifications);
});

notificationRouter.put("/:id/read", async (req, res) => {
  const id = req.params.id;
  await Notification.findByIdAndUpdate(id, { isRead: true });
  res.json({ message: "Notification marquée comme lue" });
});

notificationRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Notification.findByIdAndDelete(id);
  res.json({ message: "Notification supprimée" });
});

// notificationRouter.post('/messages', async (req, res) => {
//   const { senderId, receiverId, content } = req.body;
//   const message = new Message({ senderId, receiverId, content });
//   await message.save();
//   const notification = new Notification({
//     type: 'new_message',
//     message: `Vous avez reçu un nouveau message de ${senderId}`,
//     userId: receiverId,
//   });
//   await notification.save();
//   io.emit(`notification-${receiverId}`, notification);
//   res.json(message);
// });

notificationRouter.post("/comments", async (req, res) => {
  const { postId, userId, content } = req.body;
  const comment = new Comment({ postId, userId, content });
  await comment.save();
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Publication non trouvée" });
  }
  if (post.userId !== userId) {
    const notification = new Notification({
      type: "new_comment",
      message: `${userId} a commenté votre publication`,
      userId: post.userId,
    });
    await notification.save();
    io.emit(`notification-${post.userId}`, notification);
  }
  res.json(comment);
});

notificationRouter.post("/posts", async (req, res) => {
  const { userId, content } = req.body;
  const post = new Post({ userId, content });
  await post.save();
  res.json(post);
});

export default notificationRouter;
