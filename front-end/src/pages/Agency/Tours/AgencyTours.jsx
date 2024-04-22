import "./agencyTours.css";
import React, { useState } from "react";
import AgencyNavbar from "../../../components/agency/navbar/AgencyNavbar";
import CreateTourMultiStepForm from "../../../components/agency/createTour/CreateTourMultiStepForm";
import AgencyUpperSection from "../../../components/agency/upperSection/AgencyUpperSection";
import TourListItem from "../../../components/agency/TourListItem/TourListItem";
import { tours } from "../../../data/data";

const AgencyTours = () => {
  const [createTour, setCreateTour] = useState(false);
  return (
    <div className="agencyTours">
      <AgencyNavbar />
      <div className="agency-main-section">
        <AgencyUpperSection
          createTour={createTour}
          setCreateTour={setCreateTour}
        />
        <div className="tour-list-titles">
          <div className="id tour-list-title">Collection</div>
          <div className="country tour-list-title">Country</div>
          <div className="clients tour-list-title">Clients</div>
          <div className="days tour-list-title">Days</div>
        </div>
        <div className="agency-tour-list">
          <TourListItem id={1} tour={tours[0]} />
          <TourListItem id={2} tour={tours[0]} />
          <TourListItem id={3} tour={tours[0]} />
          <TourListItem id={4} tour={tours[0]} />
        </div>
      </div>
      {createTour && <CreateTourMultiStepForm />}
    </div>
  );
};

export default AgencyTours;
