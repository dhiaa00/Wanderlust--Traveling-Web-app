import "./agencyTours.css";
import planeSvg from "/src/SVGs/Plane.svg";
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
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [agencyTours, setAgencyTours] = useState([]);
  const agencyId = window.location.pathname
    .split("agency/")
    .pop()
    .replace("/tours", "");

  const handleSearch = debounce(async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/offer/search`,
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
          `${backendUrl}/offer/getAll`,
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

  console.log("agencyTours", agencyTours.length);
  return (
    <>
      {agencyTours.length != 0 && (
        <div className="tour-list-titles">
          <div className="id tour-list-title">Collection</div>
          <div className="country tour-list-title">Country</div>
          <div className="clients tour-list-title">Clients</div>
          <div className="days tour-list-title">Days</div>
          <div className="delete tour-list-title"></div>
        </div>
      )}
      <div className="agency-tour-list">
        {agencyTours.length != 0 ? (
          agencyTours.map((tour, i) => {
            return (
              <TourListItem
                key={tour.id}
                order={i + 1}
                tour={tour}
                setAgencyTours={setAgencyTours}
              />
            );
          })
        ) : (
          <div
            style={{
              margin: "1rem 0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "4rem",
            }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}>
              <img src={planeSvg} alt="plane" style={{ width: "50%" }} />
            </div>
            <div className="no-tours" style={{ textAlign: "center" }}>
              No tours found
            </div>
          </div>
        )}
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
