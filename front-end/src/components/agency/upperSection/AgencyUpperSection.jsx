import React from "react";
import "./agencyUpperSection.css";
import ChevronButton from "../buttons/ChevronButton";
import CreateTourButton from "../buttons/CreateTourButton";
import SearchBar from "./SearchBar";
import ManagementButtons from "../buttons/ManagementButtons";

const AgencyUpperSection = ({
  createTour,
  setCreateTour,
  notificationsOpen,
  setNotificationsOpen,
  setTourCreated,
  setSearchInput,
  newNotification,
}) => {
  return (
    <div className="agency-upper-section">
      <div className="agency-upper-section-buttons">
        <ChevronButton title="My Offers" />
        <CreateTourButton
          createTour={createTour}
          setCreateTour={setCreateTour}
          setTourCreated={setTourCreated}
        />
      </div>
      <div className="search-and-management-buttons">
        <SearchBar setSearchInput={setSearchInput} />
        <ManagementButtons
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
          newNotification={newNotification}
        />
      </div>
    </div>
  );
};

export default AgencyUpperSection;
