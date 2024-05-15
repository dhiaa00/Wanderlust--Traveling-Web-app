import React from "react";
import "./managementButtons.css";
import chatIcon from "/src/SVGs/chat-icon.svg";
import notificationIcon from "/src/SVGs/notification-icon.svg";
import settingsIcon from "/src/SVGs/settings-icon.svg";
import { useNavigate } from "react-router-dom";

const ManagementButtons = ({ notificationsOpen, setNotificationsOpen }) => {
  const navigate = useNavigate();
  const agencyId = JSON.parse(localStorage.getItem("agency"))._id;

  const handleClickMessages = () => {
    navigate("/agency/" + agencyId + "/messages");
  };
  const handleClickNotification = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const handleClickSettings = () => {
    navigate("/agency/" + agencyId + "/settings/info");
  };

  return (
    <div className="management-buttons">
      <button className="management-button">
        <img src={chatIcon} alt="chat icon" onClick={handleClickMessages} />
      </button>
      <button className="management-button" onClick={handleClickNotification}>
        <img src={notificationIcon} alt="notification icon" />
      </button>
      <button className="management-button">
        <img
          src={settingsIcon}
          alt="settings icon"
          onClick={handleClickSettings}
        />
      </button>
    </div>
  );
};

export default ManagementButtons;
