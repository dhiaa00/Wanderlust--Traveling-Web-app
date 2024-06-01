// routes/notifications.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const Message = require('../models/Message');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { io } = require('../server');

router.get('/notifications', async (req, res) => {
  const userId = req.query.userId;
  const notifications = await Notification.find({ userId });
  res.json(notifications);
});

router.post('/notifications', async (req, res) => {
  const { type, message, userId } = req.body;
  const notification = new Notification({ type, message, userId });
  await notification.save();
  io.emit(`notification-${userId}`, notification);
  res.json({ message: 'Notification envoyée avec succès', notification });
});

router.get('/notifications/unread', async (req, res) => {
  const userId = req.query.userId;
  const notifications = await Notification.find({ userId, isRead: false });
  res.json(notifications);
});

router.put('/notifications/:id/read', async (req, res) => {
  const id = req.params.id;
  await Notification.findByIdAndUpdate(id, { isRead: true });
  res.json({ message: 'Notification marquée comme lue' });
});

router.delete('/notifications/:id', async (req, res) => {
  const id = req.params.id;
  await Notification.findByIdAndDelete(id);
  res.json({ message: 'Notification supprimée' });
});

router.post('/messages', async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  const message = new Message({ senderId, receiverId, content });
  await message.save();
  const notification = new Notification({
    type: 'new_message',
    message: `Vous avez reçu un nouveau message de ${senderId}`,
    userId: receiverId,
  });
  await notification.save();
  io.emit(`notification-${receiverId}`, notification);
  res.json(message);
});

router.post('/comments', async (req, res) => {
  const { postId, userId, content } = req.body;
  const comment = new Comment({ postId, userId, content });
  await comment.save();
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: 'Publication non trouvée' });
  }
  if (post.userId !== userId) {
    const notification = new Notification({
      type: 'new_comment',
      message: `${userId} a commenté votre publication`,
      userId: post.userId,
    });
    await notification.save();
    io.emit(`notification-${post.userId}`, notification);
  }
  res.json(comment);
});

router.post('/posts', async (req, res) => {
  const { userId, content } = req.body;
  const post = new Post({ userId, content });
  await post.save();
  res.json(post);
});

module.exports = router;
