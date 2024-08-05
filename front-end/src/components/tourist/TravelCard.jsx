import React from "react";
import "./travelCard.css";
import { calculateDaysNumber } from "../../utils/calculateDaysNumber";
import { Link } from "react-router-dom";

const TravelCard = ({ travel }) => {
  return (
    <div className="travel-card">
      <img src={travel.thumbImageUrl} alt="travel" />
      <div className="travel-description">
        <div className="travel-title">{travel.placeTo}</div>
        <div className="travel-date">{travel.startDate.split("T")[0]}</div>
        <div className="travel-duration">
          {calculateDaysNumber(travel.startDate, travel.endDate)} Days
        </div>
        <div className="rating">{travel.rating} stars</div>
        <div className="price-and-details">
          <div className="price">
            <p>Starts From:</p>
            <p>{travel.price} DA</p>
          </div>
          <Link to={`/tours/${travel._id}`} className="details-button">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
