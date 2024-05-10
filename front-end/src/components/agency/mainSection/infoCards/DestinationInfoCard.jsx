import React from "react";
import "./infoCard.css";
import travelDateIcon from "/src/SVGs/travelDateIcon.svg";
import UpperSectionForInfoCards from "./UpperSectionForInfoCards";

const DestinationInfoCard = ({ tour }) => {
  const destination = tour.country || "";
  const firstDestination = tour.placeFrom || "???";
  const secondDestination = tour.placeTo || "???";
  const flightTime = { hours: tour.flightDuration, minutes: 0 };
  return (
    <div className="destination-info-card agency-tour-info-card">
      <UpperSectionForInfoCards title="Destination" />
      <div className="info-card-middle-section">{destination}</div>
      <div className="destination-bottom-section">
        <div className="travel-date-bottom-section">
          <span className="destination-name">{firstDestination}</span>
          <img
            src={travelDateIcon}
            alt="Travel Icon"
            width={23}
            height={12.5}
          />
          <span className="destination-name">{secondDestination}</span>
        </div>
        <div className="flight-time">
          <img src="" alt="" />
          {flightTime.hours}h {flightTime.minutes}min Flight
        </div>
      </div>
    </div>
  );
};

export default DestinationInfoCard;
