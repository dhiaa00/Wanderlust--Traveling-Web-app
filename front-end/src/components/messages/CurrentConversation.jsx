import React, { Suspense, useEffect, useRef, useState } from "react";
import { socket } from "../../socket";
import { CircularProgress } from "@mui/material";

const CurrentConversation = ({
  conversation,
  setCurrentConversation,
  otherParticipant,
}) => {
  const [message, setMessage] = useState("");

  const conversationId = window.location.pathname.split("/").pop();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const senderType = user.agencyName ? "agency" : "user";

  console.log("conversation currentConversation", conversation);

  useEffect(() => {
    socket.emit("joinConversation", conversationId);
  }, [conversationId]);

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      console.log("new message", newMessage);
      console.log(otherParticipant);

      setCurrentConversation((prevConversation) => ({
        ...prevConversation,
        messages: [...prevConversation.messages, newMessage],
      }));
    };

    socket.on("newMessage", handleNewMessage);

    // Cleanup function to remove the event listener
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    socket.emit("sendMessage", {
      conversationId,
      sender: userId,
      senderType,
      text: message,
    });
    setMessage("");
    setCurrentConversation({
      ...conversation,
      messages: [
        ...conversation.messages,
        {
          sender: userId,
          content: message,
          createdAt: new Date(),
        },
      ],
    });
  };

  // handle scroll to bottom

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    // instant scroll
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  return (
    <div className="current-opened-message">
      {conversation ? (
        <>
          <div className="upper-section">
            <div className="sender-name">
              <h2>{otherParticipant.username}</h2>
              <p>Online</p>
            </div>
            <p>...</p>
          </div>
          <div className="messages-content">
            <Suspense fallback={CircularProgress}>
              <div className="current-messages-list">
                {conversation.messages.map((message, i) => {
                  return (
                    <p
                      key={i}
                      className={
                        message.sender == otherParticipant.id
                          ? "message-item"
                          : "own-message-item"
                      }
                      ref={
                        i === conversation.messages.length - 1
                          ? messagesEndRef
                          : null
                      }>
                      {message.content}
                    </p>
                  );
                })}
              </div>
            </Suspense>
          </div>
          <div className="bottom-section">
            <input
              type="text"
              placeholder="Type a message"
              className="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="send-message-btn" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </>
      ) : (
        <div className="no-message-selected">
          <h2
            style={{
              color: "#333",
              fontSize: "1.5rem",
              fontWeight: "bold",
              textAlign: "center",
            }}>
            No Message Selected
          </h2>
          <p
            style={{
              color: "#333",
              fontWeight: "bold",
              textAlign: "center",
            }}>
            Select a message to view it here
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrentConversation;
