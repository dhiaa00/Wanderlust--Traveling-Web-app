import React from "react";
import searchIcon from "/src/SVGs/messageSearchIcon.svg";
import ConversationListElement from "./ConversationListElement";

const MessagesList = ({ conversations }) => {
  const activeConversation = window.location.pathname.split("/").pop();
  return (
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
      {conversations.length > 0 ? (
        <div className="message-list-container">
          {conversations.map((conversation, i) => {
            return (
              <ConversationListElement
                key={i}
                conversation={conversation}
                active={
                  conversation.conversationId === activeConversation
                    ? "active"
                    : ""
                }
              />
            );
          })}
        </div>
      ) : (
        <div
          className="no-messages"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "1rem",
          }}>
          <h2
            style={{
              color: "#333",
              fontSize: "1.5rem",
              fontWeight: "bold",
              textAlign: "center",
            }}>
            No Messages
          </h2>
          <p
            style={{
              color: "#333",
              fontWeight: "bold",
              textAlign: "center",
            }}>
            Start a conversation with a user to see messages here
          </p>
        </div>
      )}
    </div>
  );
};

export default MessagesList;
