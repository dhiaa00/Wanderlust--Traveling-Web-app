import React, { useState } from "react";
import "./singletourpage.css";
import AgencyNavbar from "../../../components/agency/navbar/AgencyNavbar";
import AgencyMainSection from "../../../components/agency/mainSection/AgencyMainSection";
import CreateTourMultiStepForm from "../../../components/agency/createTour/CreateTourMultiStepForm";

const SingleTourPage = () => {
  const [createTour, setCreateTour] = useState(false);
  return (
    <div className="signle-tour-page">
      <AgencyNavbar />
      <AgencyMainSection
        createTour={createTour}
        setCreateTour={setCreateTour}
      />
      {createTour && <CreateTourMultiStepForm />}
    </div>
  );
};

export default SingleTourPage;
