import { useNavigate } from "react-router-dom";
import "./tourListItem.css";
import React from "react";
import { calculateDaysNumber } from "../../../utils/calculateDaysNumber";

const TourListItem = ({ order, tour }) => {
  const navigate = useNavigate();
  const handleTourClick = () => {
    navigate(`./${tour.id}`);
  };
  return (
    <div className="agency-tour-list-item" onClick={handleTourClick}>
      <div className="image-and-id tour-list-child">
        <div className="id">{order}</div>
        <div className="image-container">
          <img src={tour.thumbImageUrl} alt="Travel Image" />
        </div>
      </div>
      <div className="country tour-list-child">{tour.country}</div>
      <div className="clients tour-list-child">{tour.clients.length}</div>
      <div className="days tour-list-child">
        {calculateDaysNumber(tour.startDate, tour.endDate)}
      </div>
    </div>
  );
};

export default TourListItem;
