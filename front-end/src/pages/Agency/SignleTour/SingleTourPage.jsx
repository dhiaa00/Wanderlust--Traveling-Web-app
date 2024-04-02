import React from "react";
import "./singletourpage.css";
import AgencyNavbar from "../../../components/agency/navbar/AgencyNavbar";
import AgencyMainSection from "../../../components/agency/mainSection/AgencyMainSection";

const SingleTourPage = () => {
  return (
    <div className="signle-tour-page">
      <AgencyNavbar />
      <AgencyMainSection />
    </div>
  );
};

export default SingleTourPage;
