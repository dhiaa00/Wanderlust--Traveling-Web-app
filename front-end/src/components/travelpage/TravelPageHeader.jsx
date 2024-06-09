import React from "react";
import "./travelpageheader.css";
import travelpageimages from "/src/images/travelpage/Travelpageheader/sahitmamaas.png";
const TravelPageHeader = ({ travel, reviews }) => {
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
            <p className="reservation-button-text">Reservation</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelPageHeader;
