import { chat } from "googleapis/build/src/apis/chat/index.js";
import {
  Message,
  Notification,
  Comment,
  Post,
} from "../models/Notification.js";
import { User } from "../models/User.js";
import { io } from "../server.js";
import { Agency } from "../models/Agency.js";

const getNotifications = async (req, res) => {
  const userId = req.params.id;
  const notifications = await Notification.find({ userId })
    .sort({ createdAt: -1 })
    .limit(10);
  let newNotifications = false;
  // replace userId with the user's name
  notifications.forEach(async (notification) => {
    if (notification.isRead === false) {
      newNotifications = true;
    }
    let user = await User.findById(notification.userId);
    if (!user) {
      user = await Agency.findById(notification.userId);
      notification.userId = user.agencyName;
    } else {
      notification.userId = user.username;
    }
  });
  res.status(200).json({ notifications, newNotifications });
};

const createNotification = async (req, res) => {
  const { type, message, userId } = req.body;
  const notification = new Notification({ type, message, userId });
  await notification.save();
  io.emit(`notification-${userId}`, notification);
  res.json({ message: "Notification envoyée avec succès", notification });
};

const getUnreadNotifications = async (req, res) => {
  const userId = req.query.userId;
  const notifications = await Notification.find({ userId, isRead: false });
  res.json(notifications);
};

const markNotificationAsRead = async (req, res) => {
  try {
    const id = req.params.id;
    await Notification.findByIdAndUpdate(id, { isRead: true });
    res.status(201).json({ message: "Notification Read" });
  } catch (err) {
    console.log(err);
  }
};

const deleteNotification = async (req, res) => {
  const id = req.params.id;
  await Notification.findByIdAndDelete(id);
  res.json({ message: "Notification deleted" });
};

const createMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  const message = new Message({ senderId, receiverId, content });
  await message.save();
  const notification = new Notification({
    type: "new_message",
    message: `Vous avez reçu un nouveau message de ${senderId}`,
    userId: receiverId,
  });
  await notification.save();
  io.emit(`notification-${receiverId}`, notification);
  res.json(message);
};

const createComment = async (req, res) => {
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
};

const createPost = async (req, res) => {
  const { userId, content } = req.body;
  const post = new Post({ userId, content });
  await post.save();
  res.json(post);
};

export {
  createComment,
  createMessage,
  createNotification,
  createPost,
  markNotificationAsRead,
  deleteNotification,
  getUnreadNotifications,
  getNotifications,
};
