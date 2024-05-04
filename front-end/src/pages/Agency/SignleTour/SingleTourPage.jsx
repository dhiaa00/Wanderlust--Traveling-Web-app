import React, { lazy, Suspense, useEffect, useState } from "react";
import "./singletourpage.css";
import AgencyNavbar from "../../../components/agency/navbar/AgencyNavbar";
import AgencyMainSection from "../../../components/agency/mainSection/AgencyMainSection";
const CreateTourMultiStepForm = lazy(() =>
  import("../../../components/agency/createTour/CreateTourMultiStepForm")
);
const EditTour = lazy(() =>
  import("../../../components/agency/editTour/EditTour")
);
const Notifications = lazy(() =>
  import("../../../components/notifications/Notifications")
);
const AddCollaboration = lazy(() =>
  import("../../../components/agency/mainSection/AddCollaboration")
);
import axios from "axios";

const SingleTourPage = () => {
  const [createTour, setCreateTour] = useState(false);
  const [editTourOpen, setEditTourOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [addCollaboration, setAddCollaboration] = useState(false);
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
        addCollaboration={addCollaboration}
        setAddCollaboration={setAddCollaboration}
        tour={tour}
      />
      <Suspense fallback={<div>Loading...</div>}>
        {createTour && (
          <CreateTourMultiStepForm
            setCreateTour={setCreateTour}
            ariaHideApp={false}
          />
        )}
        {editTourOpen && (
          <EditTour ariaHideApp={false} setEditTourOpen={setEditTourOpen} />
        )}
        {notificationsOpen && <Notifications ariaHideApp={false} />}
        {addCollaboration && (
          <AddCollaboration
            addCollaboration={addCollaboration}
            setAddCollaboration={setAddCollaboration}
            ariaHideApp={false}
          />
        )}
      </Suspense>
    </div>
  );
};

export default SingleTourPage;
