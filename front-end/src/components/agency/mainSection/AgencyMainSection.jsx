import React from "react";
import "./agencyMainSection.css";
import AgencyUpperSection from "../upperSection/AgencyUpperSection";
import ImageSwiper from "./ImageSwiper";

const AgencyMainSection = () => {
  return (
    <div className="agency-main-section">
      <AgencyUpperSection />
      <div className="agency-bottom-section">
        <div className="agency-left-side">
          <div className="images-and-expenses">
            <ImageSwiper />
            <div className="expenses"></div>
          </div>
        </div>
        <div className="agency-right-side"></div>
      </div>
    </div>
  );
};

export default AgencyMainSection;
