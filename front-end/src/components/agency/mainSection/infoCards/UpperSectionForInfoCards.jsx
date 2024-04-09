import React from "react";
import "./uppersectionforinfocard.css";

const UpperSectionForInfoCards = ({ title }) => {
  return (
    <div className="info-card-upper-section">
      <h3>{title}</h3>
      <div className="three-dots-icon">
        <span>.</span>
      </div>
    </div>
  );
};

export default UpperSectionForInfoCards;
