import { useNavigate } from "react-router-dom";
import "./tourListItem.css";
import React from "react";
import { calculateDaysNumber } from "../../../utils/calculateDaysNumber";
import deleteIcon from "/src/SVGs/delete.svg";
import axios from "axios";

const TourListItem = ({ order, tour, setAgencyTours }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const handleTourClick = () => {
    navigate(`./${tour.id}`);
  };
  const handleDeleteOffer = (event) => {
    event.stopPropagation();
    try {
      const response = axios.delete(
        `${backendUrl}/offer/delete/${tour.id}`,
        {
          agency: {
            _id: tour.agency,
          },
        },
        {
          withCredentials: true,
        }
      );
      setAgencyTours((prev) => prev.filter((item) => item.id !== tour.id));
    } catch (error) {
      console.log(error);
    }
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
      <div className="delete tour-list-child">
        <button onClick={(e) => handleDeleteOffer(e)}>
          <img src={deleteIcon} alt="delete" />
        </button>
      </div>
    </div>
  );
};

export default TourListItem;
