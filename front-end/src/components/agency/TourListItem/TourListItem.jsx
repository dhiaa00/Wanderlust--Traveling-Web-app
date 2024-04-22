import { useNavigate } from "react-router-dom";
import "./tourListItem.css";
import React from "react";

const TourListItem = ({ id, tour }) => {
  const navigate = useNavigate();
  const days =
    Number(tour.date.to.split("-")[0]) - Number(tour.date.from.split("-")[0]);

  const handleTourClick = () => {
    navigate(`/agency/1/tours/${id}`);
  };
  return (
    <div className="agency-tour-list-item" onClick={handleTourClick}>
      <div className="image-and-id tour-list-child">
        <div className="id">{id}</div>
        <div className="image-container">
          <img
            src={`/src/images/testing/${tour.country}/${tour.country}1.png`}
            alt="Travel Image"
          />
        </div>
      </div>
      <div className="country tour-list-child">{tour.country}</div>
      <div className="clients tour-list-child">{tour.clients}</div>
      <div className="days tour-list-child">{days}</div>
    </div>
  );
};

export default TourListItem;
