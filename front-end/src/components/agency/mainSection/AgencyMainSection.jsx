import React, { lazy, Suspense } from "react";
import "./agencyMainSection.css";
import AgencyUpperSection from "../upperSection/AgencyUpperSection";
import ImageSwiper from "./ImageSwiper";
import TravelDateInfoCard from "./infoCards/TravelDateInfoCard";
import ClientInfoCard from "./infoCards/ClientInfoCard";
import DestinationInfoCard from "./infoCards/DestinationInfoCard";
const MapComponent = lazy(() => import("./MapComponent"));
import Expenses from "./Expenses";
import EditTourButton from "../buttons/EditTourButton";
import Collaborations from "./Collaborations";
import Timeline from "./Timeline";
import TourComments from "./TourComments";

const AgencyMainSection = ({
  editTourOpen,
  setEditTourOpen,
  addCollaboration,
  setAddCollaboration,
  tour,
}) => {
  return (
    <>
      <div className="agency-bottom-section">
        <div className="agency-left-side">
          <div className="images-and-expenses">
            <ImageSwiper tour={tour} />
            <Expenses collaborations={tour.collaborations} />
          </div>
          <div className="info-cards">
            <TravelDateInfoCard tour={tour} />
            <ClientInfoCard clients={tour.clients} />
            <DestinationInfoCard tour={tour} />
          </div>
          <div className="map-and-collaborations">
            <Suspense fallback={<div>Loading...</div>}>
              <MapComponent place={tour.placeTo} />
            </Suspense>
            <Collaborations
              addCollaboration={addCollaboration}
              setAddCollaboration={setAddCollaboration}
              collaborations={tour.collaborations}
            />
          </div>
        </div>
        <div className="agency-right-side">
          <EditTourButton
            editTourOpen={editTourOpen}
            setEditTourOpen={setEditTourOpen}
          />
          <div className="right-side-upper-section">
            <Timeline tour={tour} />
            <TourComments />
          </div>
        </div>
      </div>
    </>
  );
};

export default AgencyMainSection;
