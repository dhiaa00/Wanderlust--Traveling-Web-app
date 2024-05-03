import { useNavigate } from "react-router-dom";
import "./tourListItem.css";
import React from "react";

const TourListItem = ({ order, tour }) => {
  const navigate = useNavigate();
  const calculateDays = (startDate, endDate) => {
    const days =
      Number(
        endDate.split("-")[tour.endDate.split("-").length - 1].slice(0, 2)
      ) -
      Number(
        startDate.split("-")[tour.startDate.split("-").length - 1].slice(0, 2)
      );
    const years =
      Number(endDate.split("-")[0]) - Number(startDate.split("-")[0]);
    const months =
      Number(endDate.split("-")[1]) - Number(startDate.split("-")[1]);
    const finalResult = years * 365 + months * 30 + days;
    return finalResult;
  };
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
        {calculateDays(tour.startDate, tour.endDate)}
      </div>
    </div>
  );
};

export default TourListItem;
