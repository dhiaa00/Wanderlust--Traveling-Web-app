import React from "react";
import "./messages.css";
import searchIcon from "/src/SVGs/messageSearchIcon.svg";

const Messages = () => {
  return (
    <div className="messages">
      <div className="message-list">
        <h1>Messages</h1>
        <div className="messages-search">
          <img src={searchIcon} alt="search icon" />
          <input
            type="text"
            placeholder="Search for messages"
            className="search-input"
          />
        </div>
        <div className="message-list-container">
          <div className="message active">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="sender"
              className="message-sender-img"
            />
            <div className="message-sender">
              <div className="message-sender-name">Sender Name</div>
              <p>Message text text</p>
            </div>
          </div>
          <div className="message">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="sender"
              className="message-sender-img"
            />
            <div className="message-sender">
              <div className="message-sender-name">Sender Name</div>
              <p>Message text text</p>
            </div>
          </div>
          <div className="message">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="sender"
              className="message-sender-img"
            />
            <div className="message-sender">
              <div className="message-sender-name">Sender Name</div>
              <p>Message text text</p>
            </div>
          </div>
        </div>
      </div>
      <div className="current-opened-message">
        <div className="upper-section">
          <div className="sender-name">
            <h2>Sender Name</h2>
            <p>Online</p>
          </div>
          <p>...</p>
        </div>
        <div className="messages-content">
          <div className="current-messages-list">
            <p className="message-item">Message text text text</p>
            <p className="own-message-item">Message text</p>
            <p className="message-item">Message text text</p>
            <p className="own-message-item">Message text text text text</p>
            <p className="message-item">Message text</p>
            <p className="own-message-item">Message text text</p>
          </div>
        </div>
        <div className="bottom-section">
          <input
            type="text"
            placeholder="Type a message"
            className="message-input"
          />
          <button className="send-message-btn">Send</button>
        </div>
      </div>
      <div className="sender-info">
        <div className="sender-info-container">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="sender"
            className="sender-info-img"
          />
          <div className="sender-info-text">
            <div className="sender-info-text-item">
              <h3>Email</h3>
              <p>example@gmail.com</p>
            </div>
            <div className="sender-info-text-item">
              <h3>Phone Number</h3>
              <p>0564729120</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
