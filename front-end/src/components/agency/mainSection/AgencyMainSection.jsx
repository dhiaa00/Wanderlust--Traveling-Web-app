import React from "react";
import "./agencyMainSection.css";
import AgencyUpperSection from "../upperSection/AgencyUpperSection";
import ImageSwiper from "./ImageSwiper";
import TravelDateInfoCard from "./infoCards/TravelDateInfoCard";
import ClientInfoCard from "./infoCards/ClientInfoCard";
import DestinationInfoCard from "./infoCards/DestinationInfoCard";
import MapComponent from "./MapComponent";
import Expenses from "./Expenses";

const AgencyMainSection = ({ createTour, setCreateTour }) => {
  return (
    <div className="agency-main-section">
      <AgencyUpperSection
        createTour={createTour}
        setCreateTour={setCreateTour}
      />
      <div className="agency-bottom-section">
        <div className="agency-left-side">
          <div className="images-and-expenses">
            <ImageSwiper />
            <Expenses />
          </div>
          <div className="info-cards">
            <TravelDateInfoCard />
            <ClientInfoCard />
            <DestinationInfoCard />
          </div>
          <div className="map-and-collaborations">
            <MapComponent />
          </div>
        </div>
        <div className="agency-right-side">
          <div className="right-side-upper-section">
            <h2>Timeline</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyMainSection;
