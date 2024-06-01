// models/Notification.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  type: String,
  message: String,
  userId: String,
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
});

const Notification = mongoose.model("Notification", notificationSchema);

// models/Message.js

// const messageSchema = new mongoose.Schema({
//   senderId: String,
//   receiverId: String,
//   content: String,
//   createdAt: { type: Date, default: Date.now },
// });

// const Message = mongoose.model("Message", messageSchema);
// module.exports = Message;

// models/Comment.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: String,
  userId: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

// models/Post.js

const postSchema = new mongoose.Schema({
  userId: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

export { Notification, Comment, Post };
