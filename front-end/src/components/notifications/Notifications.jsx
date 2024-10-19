import React from "react";
import "./notifications.css";
import Notification from "./Notification";

const Notifications = (notifications) => {
  return (
    <div className="notifications">
      <div className="notifications-upper-section">
        <h2>Notifications</h2>
        <button className="mark-as-read">Mark All As Read</button>
      </div>
      <div className="notifications-container">
        {notifications &&
          notifications.notifications.map((notification) => (
            <Notification key={notification._id} notification={notification} />
          ))}
        {(!notifications || notifications.notifications.length === 0) && (
          <p style={{ padding: "1rem 0" }}>No notifications</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
