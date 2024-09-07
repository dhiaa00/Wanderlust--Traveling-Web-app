import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import "./messages.css";
import { CircularProgress } from "@mui/material";
import MessagesList from "../../../components/messages/MessagesList.jsx";
import CurrentConversation from "../../../components/messages/CurrentConversation.jsx";
import SenderInfo from "../../../components/messages/SenderInfo.jsx";

const Messages = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const [conversations, setConversations] = useState([]);
  const currentConversationId = window.location.pathname.split("/").pop();
  const [currentConversation, setCurrentConversation] = useState(null);

  const getConversations = async () => {
    try {
      const response = await axios.get(`${backendUrl}/conversation/${userId}`);
      setConversations(response.data.conversations);
      const partial = response.data.conversations.find(
        (conversation) => conversation.conversationId === currentConversationId
      );
      getCurrentConversation(partial);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const getCurrentConversation = async (partial) => {
    try {
      const response = await axios.post(
        `${backendUrl}/conversation/get/${partial.conversationId}`,
        {
          userId: userId,
        },
        {
          withCredentials: true,
        }
      );
      setCurrentConversation(response.data.conversation);
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };

  console.log("Messages currentConversation", currentConversation);

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <div className="messages">
      <Suspense fallback={CircularProgress}>
        {conversations && <MessagesList conversations={conversations} />}

        {currentConversation && (
          <CurrentConversation
            conversation={currentConversation}
            setCurrentConversation={setCurrentConversation}
            otherParticipant={
              currentConversation ? currentConversation.otherParticipant : {}
            }
          />
        )}

        <SenderInfo
          sender={
            currentConversation ? currentConversation.otherParticipant : {}
          }
        />
      </Suspense>
    </div>
  );
};

export default Messages;
