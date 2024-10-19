import "./chatbot.css";
import chatbotIcon from "../../SVGs/chatbot/chatbot.svg";
import sendIcon from "../../SVGs/chatbot/send.svg";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { marked } from "marked";
import { set } from "lodash";

const Chatbot = ({ chatbotOpened, setChatbotOpened }) => {
  const endOfMessagesRef = useRef(null);
  const [messages, setMessages] = useState([
    { message: "Hi, how can I help you?", type: "chatbot" },
  ]);
  const [userInput, setUserInput] = useState("");
  const preferences = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).preferences
    : "[]";

  const handleGenerateResponse = async () => {
    // const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      // const response = await axios.post(`${backendUrl}/user/generateResponse`, {
      //   question: userInput,
      //   previousConversation: messages[messages.length - 1].message,
      //   preferences: preferences,
      // });
      setMessages([
        ...messages,
        { message: userInput, type: "user" },
        {
          message: "Chatbot Desactivated due to personal problems",
          type: "chatbot",
        },
      ]);
      setUserInput("");
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Failed to generate response");
    }
  };

  useEffect(() => {
    if (messages[messages.length - 1].message === userInput) {
      setUserInput("");
    }
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatbotClick = () => {
    setChatbotOpened(!chatbotOpened);
  };

  // Function to safely render markdown as HTML
  const renderMessage = (message) => {
    return { __html: marked(message) };
  };

  return (
    <div className="chatbot">
      {chatbotOpened ? (
        <div className="chatbot__container">
          <div className="chatbot__header">
            <h3>Chatbot</h3>
          </div>
          <div className="chatbot__body">
            <div className="conversation">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.type === "chatbot"
                      ? "chatbot__message"
                      : "user__message"
                  }`}
                  ref={index === messages.length - 1 ? endOfMessagesRef : null}>
                  {message.type === "chatbot" ? (
                    <p
                      dangerouslySetInnerHTML={renderMessage(
                        message.message
                      )}></p>
                  ) : (
                    <p>{message.message}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="send-message">
              <input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                type="text"
                placeholder="Type your message here"
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    setMessages([
                      ...messages,
                      { message: userInput, type: "user" },
                    ]);
                    handleGenerateResponse();
                  }
                }}
              />
              <img
                src={sendIcon}
                alt="send"
                onClick={() => {
                  setMessages([
                    ...messages,
                    { message: userInput, type: "user" },
                  ]);
                  handleGenerateResponse();
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <img
        className="chatbot-image"
        src={chatbotIcon}
        alt="chatbotIcon"
        onClick={handleChatbotClick}
      />
    </div>
  );
};

export default Chatbot;
