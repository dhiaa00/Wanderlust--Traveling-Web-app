import React from "react";

const Notification = ({ notificationRead, pictureLink }) => {
  return (
    <div
      className={
        "notification " + (notificationRead ? "" : "notification-not-read")
      }>
      {!notificationRead && (
        <div className="notification-not-read-circle"></div>
      )}
      <img src={pictureLink} alt="" />
      <div className="message">
        <div className="info">
          <h3>Mido Ne3ja</h3>
          <p>Left you a comment</p>
        </div>
        <div className="time">2 hours ago</div>
      </div>
    </div>
  );
};

export default Notification;
