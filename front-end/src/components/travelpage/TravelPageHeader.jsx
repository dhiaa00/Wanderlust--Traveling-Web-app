import React from "react";
import "./travelpageheader.css";
import chatIcon from "/src/SVGs/chat-icon.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TravelPageHeader = ({ travel, reviews }) => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleStartChat = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const agencyId = travel.agency;
    if (!user._id) {
      toast.error("You must be logged in to start a chat");
      return;
    }
    if (user.agencyName) {
      toast.error("Agencies can't start chats");
      return;
    }
    // create conversation
    const result = await axios.post(`${backendUrl}/conversation/`, {
      sender: user._id,
      receiver: agencyId,
      senderType: "user",
      text: "",
    });
    if (result.status !== 201) {
      toast.error(result.data.message);
      return;
    }
    toast.success(result.data.message);

    // redirect to messages page
    navigate(`/user/${user._id}/messages`);
    location.reload();
  };
  return (
    <div className="travelpageheader">
      <div className="logo-container">
        <img
          src={travel.agencyPhoto}
          alt=""
          className="i-dont-know-whatthehellisthat"
        />
      </div>
      <img
        className="travelpage-chat-icon"
        src={chatIcon}
        alt="chat"
        onClick={handleStartChat}
      />
      <p className="chat-icon-paragraph">Start Chat</p>
      <img
        className="image-travelpageheader"
        src={travel.thumbImageUrl}
        alt=""
      />
      <div className="information-container">
        <div className="Title-deadline-container">
          <h1>{travel.title}</h1>
          <p>
            Deadline:{" "}
            <span className="travel-date">
              {travel.startDate.split("T")[0]}
            </span>
          </p>
          <p>
            By:
            <span className="agency-name">{travel.agencyName}</span>
          </p>
        </div>
        <div className="evaluation-container ">
          <div className="Rating-evaluation evaluation-item">
            <div className="star-chkoupi">
              <p className="evaluation-container-header">
                {travel.rating}
                <img src="/src/images/travelpage/Travelpageheader/Vector.png" />
              </p>
            </div>
            <div className="comments-evaluation-container">
              <p>Medium</p>
            </div>
          </div>
          <div className="Evaluatoin-evaluation evaluation-item">
            <p className="evaluation-container-header2">{reviews.length}</p>
            <div className="comments-evaluation-container">
              <p>Evaluations</p>
            </div>
          </div>
          <div className="time-comments-evaluation evaluation-item">
            <div className="this-is-getting-outofhand">
              <p className="evaluation-container-header-time">Starting Price</p>
            </div>
            <div className="comments-evaluation-container">
              <p>{travel.price} DZD</p>
            </div>
          </div>
        </div>
        <div className="description-reservation-button">
          <button className="reservation-button">
            <p className="reservation-button-text">Reserve</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelPageHeader;
