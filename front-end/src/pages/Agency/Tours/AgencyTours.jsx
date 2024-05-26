import "./agencyTours.css";
import React, { Suspense, useEffect, useState } from "react";
import CreateTourMultiStepForm from "../../../components/agency/createTour/CreateTourMultiStepForm";
import TourListItem from "../../../components/agency/TourListItem/TourListItem";
import axios from "axios";
import Notifications from "../../../components/notifications/Notifications";
import { debounce } from "lodash";

const AgencyTours = ({
  createTour,
  setCreateTour,
  tourCreated,
  setTourCreated,
  notificationsOpen,
  seachInput,
}) => {
  const [agencyTours, setAgencyTours] = useState([]);
  const agencyId = window.location.pathname
    .split("agency/")
    .pop()
    .replace("/tours", "");

  const handleSearch = debounce(async () => {
    try {
      const response = await axios.post(
        "https://wanderlust-backend-server.onrender.com/offer/search",
        {
          id: agencyId,
          searchInput: seachInput,
        },
        { withCredentials: true }
      );
      setAgencyTours(response.data.data);
    } catch (error) {
      console.error("Error searching tours:", error);
    }
  }, 100); // delay in ms

  useEffect(() => {
    const getTours = async () => {
      try {
        const response = await axios.post(
          "https://wanderlust-backend-server.onrender.com/offer/getAll",
          {
            id: agencyId,
          },
          {
            withCredentials: true,
          }
        );
        setAgencyTours(response.data.data);
      } catch (error) {
        console.error("Error getting tours:", error);
      }
    };
    getTours();
  }, [tourCreated]);

  useEffect(() => {
    handleSearch();
  }, [seachInput]);
  return (
    <>
      <div className="tour-list-titles">
        <div className="id tour-list-title">Collection</div>
        <div className="country tour-list-title">Country</div>
        <div className="clients tour-list-title">Clients</div>
        <div className="days tour-list-title">Days</div>
        <div className="delete tour-list-title"></div>
      </div>
      <div className="agency-tour-list">
        {agencyTours.map((tour, i) => {
          return (
            <TourListItem
              key={tour.id}
              order={i + 1}
              tour={tour}
              setAgencyTours={setAgencyTours}
            />
          );
        })}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {createTour && (
          <CreateTourMultiStepForm
            setTourCreated={setTourCreated}
            setCreateTour={setCreateTour}
            ariaHideApp={false}
          />
        )}
        {notificationsOpen && <Notifications ariaHideApp={false} />}
      </Suspense>
    </>
  );
};

export default AgencyTours;
