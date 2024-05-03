import React from "react";
import "./agencyMainSection.css";
import AgencyUpperSection from "../upperSection/AgencyUpperSection";
import ImageSwiper from "./ImageSwiper";
import TravelDateInfoCard from "./infoCards/TravelDateInfoCard";
import ClientInfoCard from "./infoCards/ClientInfoCard";
import DestinationInfoCard from "./infoCards/DestinationInfoCard";
import MapComponent from "./MapComponent";
import Expenses from "./Expenses";
import EditTourButton from "../buttons/EditTourButton";
import Collaborations from "./Collaborations";

const AgencyMainSection = ({
  createTour,
  setCreateTour,
  editTourOpen,
  setEditTourOpen,
  notificationsOpen,
  setNotificationsOpen,
  tour,
}) => {
  return (
    <div className="agency-main-section">
      <AgencyUpperSection
        createTour={createTour}
        setCreateTour={setCreateTour}
        notificationsOpen={notificationsOpen}
        setNotificationsOpen={setNotificationsOpen}
      />
      <div className="agency-bottom-section">
        <div className="agency-left-side">
          <div className="images-and-expenses">
            <ImageSwiper tour={tour} />
            <Expenses />
          </div>
          <div className="info-cards">
            <TravelDateInfoCard tour={tour} />
            <ClientInfoCard clients={tour.clients} />
            <DestinationInfoCard tour={tour} />
          </div>
          <div className="map-and-collaborations">
            <MapComponent place={tour.country} />
            <Collaborations />
          </div>
        </div>
        <div className="agency-right-side">
          <EditTourButton
            editTourOpen={editTourOpen}
            setEditTourOpen={setEditTourOpen}
          />
          <div className="right-side-upper-section">
            <h2>Timeline</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyMainSection;
