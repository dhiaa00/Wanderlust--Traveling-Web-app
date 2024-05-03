import "./agencyTours.css";
import React, { useEffect, useState } from "react";
import AgencyNavbar from "../../../components/agency/navbar/AgencyNavbar";
import CreateTourMultiStepForm from "../../../components/agency/createTour/CreateTourMultiStepForm";
import AgencyUpperSection from "../../../components/agency/upperSection/AgencyUpperSection";
import TourListItem from "../../../components/agency/TourListItem/TourListItem";
import axios from "axios";

const AgencyTours = () => {
  const [createTour, setCreateTour] = useState(false);
  const [agencyTours, setAgencyTours] = useState([]);
  const agencyId = window.location.pathname
    .split("agency/")
    .pop()
    .replace("/tours", "");

  useEffect(() => {
    const getTours = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/offer/getAll",
          {
            id: agencyId,
          }
        );
        setAgencyTours(response.data.data);
      } catch (error) {
        console.error("Error getting tours:", error);
      }
    };

    getTours();
  }, []);
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
          {agencyTours.map((tour, i) => {
            return <TourListItem key={tour.id} order={i + 1} tour={tour} />;
          })}
        </div>
      </div>
      {createTour && <CreateTourMultiStepForm />}
    </div>
  );
};

export default AgencyTours;
