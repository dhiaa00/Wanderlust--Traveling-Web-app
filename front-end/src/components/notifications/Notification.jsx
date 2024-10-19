import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notification = ({ notification }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const notificationRead = notification.isRead;
  const timeStamp = notification.createdAt;
  const hour = new Date(timeStamp).getHours();
  const minute = new Date(timeStamp).getMinutes();
  // if it has more than 1 day, show the date
  const time =
    new Date().getTime() - new Date(timeStamp).getTime() > 86400000
      ? new Date(timeStamp).toLocaleDateString()
      : hour + ":" + minute;

  // handle notification click
  const handleNotificationClick = async () => {
    try {
      if (!notification.isRead) {
        const response = await axios.put(
          `${backendUrl}/notifications/${notification._id}/read`,
          {},
          { withCredentials: true }
        );
        console.log(response.data);
      }
      if (notification.link.split("/")[0] == "conversation") {
        navigate(
          user.agencyName
            ? `/agency/${user._id}/messages/${notification.link.split("/")[1]}`
            : `/user/${user._id}/messages/${notification.link.split("/")[1]}`
        );
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      onClick={handleNotificationClick}
      className={
        "notification " + (notificationRead ? "" : "notification-not-read")
      }>
      {!notificationRead && (
        <div className="notification-not-read-circle"></div>
      )}
      <div className="message">
        <div className="info">
          <p>{notification.message}</p>
        </div>
        <div className="time">{time}</div>
      </div>
    </div>
  );
};

export default Notification;
