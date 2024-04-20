import "./agencyTours.css";
import React, { useState } from "react";
import AgencyNavbar from "../../../components/agency/navbar/AgencyNavbar";
import CreateTourMultiStepForm from "../../../components/agency/createTour/CreateTourMultiStepForm";
import AgencyUpperSection from "../../../components/agency/upperSection/AgencyUpperSection";

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
        <div className="agency-tour-list"></div>
      </div>
      {createTour && <CreateTourMultiStepForm />}
    </div>
  );
};

export default AgencyTours;
