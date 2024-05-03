import React, { useEffect, useState } from "react";
import "./singletourpage.css";
import AgencyNavbar from "../../../components/agency/navbar/AgencyNavbar";
import AgencyMainSection from "../../../components/agency/mainSection/AgencyMainSection";
import CreateTourMultiStepForm from "../../../components/agency/createTour/CreateTourMultiStepForm";
import EditTour from "../../../components/agency/editTour/EditTour";
import Notifications from "../../../components/notifications/Notifications";
import axios from "axios";

const SingleTourPage = () => {
  const [createTour, setCreateTour] = useState(false);
  const [editTourOpen, setEditTourOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [tour, setTour] = useState({});
  const tourId =
    window.location.pathname.split("/")[
      window.location.pathname.split("/").length - 1
    ];
  const agencyId = window.location.pathname
    .split("/agency/")
    .pop()
    .split("/")[0];

  useEffect(() => {
    const getTour = async () => {
      try {
        const tour = await axios.get(
          `http://localhost:8080/offer/get/${tourId}`,
          {
            withCredentials: true,
          }
        );
        setTour(tour.data.data);
        console.log("tour retrieved:", tour);
      } catch {
        console.error("Error getting tour:", error);
      }
    };
    getTour();
  }, []);
  return (
    <div className="signle-tour-page">
      <AgencyNavbar />
      <AgencyMainSection
        createTour={createTour}
        setCreateTour={setCreateTour}
        editTourOpen={editTourOpen}
        setEditTourOpen={setEditTourOpen}
        notificationsOpen={notificationsOpen}
        setNotificationsOpen={setNotificationsOpen}
        tour={tour}
      />
      {createTour && <CreateTourMultiStepForm />}
      {editTourOpen && <EditTour />}
      {notificationsOpen && <Notifications />}
    </div>
  );
};

export default SingleTourPage;
