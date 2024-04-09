import React from "react";
import "./managementButtons.css";
import chatIcon from "/src/SVGs/chat-icon.svg";
import notificationIcon from "/src/SVGs/notification-icon.svg";
import settingsIcon from "/src/SVGs/settings-icon.svg";

const ManagementButtons = () => {
  return (
    <div className="management-buttons">
      <button className="management-button">
        <img src={chatIcon} alt="chat icon" />
      </button>
      <button className="management-button">
        <img src={notificationIcon} alt="notification icon" />
      </button>
      <button className="management-button">
        <img src={settingsIcon} alt="settings icon" />
      </button>
    </div>
  );
};

export default ManagementButtons;
