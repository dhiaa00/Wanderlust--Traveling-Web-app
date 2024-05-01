import { useState } from "react";
import "./notifications.css";
import Notification from "./Notification";

const Notifications = () => {
  const [notificationRead, setNotificationRead] = useState(false);
  return (
    <div className="notifications">
      <div className="notifications-upper-section">
        <h2>Notifications</h2>
        <button className="mark-as-read">Mark All As Read</button>
      </div>
      <div className="notifications-container">
        <Notification
          notificationRead={notificationRead}
          pictureLink="/src/images/testing/profile-picture.png"
        />
        <Notification
          notificationRead={notificationRead}
          pictureLink="/src/images/testing/profile-picture.png"
        />
        <Notification
          notificationRead={notificationRead}
          pictureLink="/src/images/testing/profile-picture.png"
        />
      </div>
    </div>
  );
};

export default Notifications;
