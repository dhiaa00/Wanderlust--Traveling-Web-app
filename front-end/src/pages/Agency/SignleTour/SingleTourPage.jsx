import React, { useState } from "react";
import "./singletourpage.css";
import AgencyNavbar from "../../../components/agency/navbar/AgencyNavbar";
import AgencyMainSection from "../../../components/agency/mainSection/AgencyMainSection";
import CreateTourMultiStepForm from "../../../components/agency/createTour/CreateTourMultiStepForm";
import EditTour from "../../../components/agency/editTour/EditTour";
import Notifications from "../../../components/notifications/Notifications";

const SingleTourPage = () => {
  const [createTour, setCreateTour] = useState(false);
  const [editTourOpen, setEditTourOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
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
      />
      {createTour && <CreateTourMultiStepForm />}
      {editTourOpen && <EditTour />}
      {notificationsOpen && <Notifications />}
    </div>
  );
};

export default SingleTourPage;
