import React, { lazy, Suspense, useEffect, useState } from "react";
import "./singletourpage.css";
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

const SingleTourPage = ({
  createTour,
  setCreateTour,
  setTourCreated,
  notificationsOpen,
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [editTourOpen, setEditTourOpen] = useState(false);
  const [tourUpdated, setTourUpdated] = useState(false);
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
        const tour = await axios.get(`${backendUrl}/offer/get/${tourId}`, {
          withCredentials: true,
        });
        setTour(tour.data.data);
      } catch {
        console.error("Error getting tour:", error);
      }
    };
    getTour();
  }, [tourUpdated]);
  return (
    <>
      <AgencyMainSection
        editTourOpen={editTourOpen}
        setEditTourOpen={setEditTourOpen}
        tourUpdated={tourUpdated}
        setTourUpdated={setTourUpdated}
        addCollaboration={addCollaboration}
        setAddCollaboration={setAddCollaboration}
        tour={tour}
      />
      <Suspense fallback={<div>Loading...</div>}>
        {editTourOpen && (
          <EditTour
            ariaHideApp={false}
            setEditTourOpen={setEditTourOpen}
            setTourUpdated={setTourUpdated}
          />
        )}
        {addCollaboration && (
          <AddCollaboration
            addCollaboration={addCollaboration}
            setAddCollaboration={setAddCollaboration}
            ariaHideApp={false}
          />
        )}
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

export default SingleTourPage;
