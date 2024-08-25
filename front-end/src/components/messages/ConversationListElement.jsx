import React from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

const ConversationListElement = ({ conversation, active }) => {
  const navigate = useNavigate();

  const handleSelectConversation = () => {
    const currentConversationId = window.location.pathname.split("/").pop();
    if (!currentConversationId) {
      socket.disconnect();
    }
    if (currentConversationId === conversation.conversationId) return;

    navigate(`./${conversation.conversationId}`);
    navigate(0);
  };

  return (
    <div className={`message ${active}`} onClick={handleSelectConversation}>
      <img
        src={conversation.otherParticipant.profilePhoto}
        alt="sender"
        className="message-sender-img"
      />
      <div className="message-sender">
        <div className="message-sender-name">
          {conversation.otherParticipant.username}
        </div>
        <p>{conversation.latestMessage.content}</p>
      </div>
    </div>
  );
};

export default ConversationListElement;
