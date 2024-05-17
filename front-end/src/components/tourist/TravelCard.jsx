import React from "react";
import travelImage from "/src/images/testing/japan/japan2.jpg";
import "./travelCard.css";
import { calculateDaysNumber } from "../../utils/calculateDaysNumber";

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
        <div className="rating">4.5</div>
        <div className="price-and-details">
          <div className="price">
            <p>Starts From:</p>
            <p>{travel.price} DA</p>
          </div>
          <div className="details-button">Details</div>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
