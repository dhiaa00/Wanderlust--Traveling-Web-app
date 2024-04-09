import React from "react";
import "./infoCard.css";
import travelDateIcon from "/src/SVGs/travelDateIcon.svg";
import UpperSectionForInfoCards from "./UpperSectionForInfoCards";

const TravelDateInfoCard = () => {
  const DaysNumber = 5;
  const departDate = "12-9-2024";
  const returnDate = "17-9-2024";
  return (
    <div className="travel-date-info-card agency-tour-info-card">
      <UpperSectionForInfoCards title="Travel Date" />
      <div className="info-card-middle-section">{DaysNumber} Days</div>
      <div className="travel-date-bottom-section">
        <span>{departDate}</span>
        <img src={travelDateIcon} alt="Travel Icon" />
        <span>{returnDate}</span>
      </div>
    </div>
  );
};

export default TravelDateInfoCard;
