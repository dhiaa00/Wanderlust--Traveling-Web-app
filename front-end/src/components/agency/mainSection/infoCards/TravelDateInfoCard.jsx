import React from "react";
import "./infoCard.css";
import travelDateIcon from "/src/SVGs/travelDateIcon.svg";
import UpperSectionForInfoCards from "./UpperSectionForInfoCards";
import { calculateDaysNumber } from "../../../../utils/calculateDaysNumber";

const TravelDateInfoCard = ({ tour }) => {
  console.log(tour);
  const departDate = tour.startDate ? tour.startDate.slice(0, 10) : "";
  const returnDate = tour.endDate ? tour.endDate.slice(0, 10) : "";
  const DaysNumber =
    tour.startDate && tour.endDate
      ? calculateDaysNumber(tour.startDate, tour.endDate)
      : "";
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
