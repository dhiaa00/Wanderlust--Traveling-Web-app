import express from "express";
import {
  getNotifications,
  createNotification,
  getUnreadNotifications,
  markNotificationAsRead,
  deleteNotification,
  createMessage,
  createComment,
  createPost,
} from "../controllers/notificationControllers.js";
import { body } from "express-validator";
import authenticate from "../middleware/authenticate.js";

const notificationRouter = express.Router();

notificationRouter
  .route("/:id")
  .get(authenticate, getNotifications)
  .post(
    authenticate,
    [
      body("type").isString().notEmpty(),
      body("message").isString().notEmpty(),
      body("userId").isString().notEmpty(),
    ],
    createNotification
  );

notificationRouter.route("/unread").get(authenticate, getUnreadNotifications);

notificationRouter.route("/:id/read").put(authenticate, markNotificationAsRead);

notificationRouter.route("/:id").delete(authenticate, deleteNotification);

notificationRouter
  .route("/messages")
  .post(
    authenticate,
    [
      body("senderId").isString().notEmpty(),
      body("receiverId").isString().notEmpty(),
      body("content").isString().notEmpty(),
    ],
    createMessage
  );

notificationRouter
  .route("/comments")
  .post(
    authenticate,
    [
      body("postId").isString().notEmpty(),
      body("userId").isString().notEmpty(),
      body("content").isString().notEmpty(),
    ],
    createComment
  );

notificationRouter
  .route("/posts")
  .post(
    authenticate,
    [
      body("userId").isString().notEmpty(),
      body("content").isString().notEmpty(),
    ],
    createPost
  );

export default notificationRouter;
