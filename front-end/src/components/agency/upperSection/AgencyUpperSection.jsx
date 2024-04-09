import React from "react";
import "./agencyUpperSection.css";
import ChevronButton from "../buttons/ChevronButton";
import CreateTourButton from "../buttons/CreateTourButton";
import SearchBar from "./SearchBar";
import ManagementButtons from "../buttons/ManagementButtons";

const AgencyUpperSection = () => {
  return (
    <div className="agency-upper-section">
      <div className="agency-upper-section-buttons">
        <ChevronButton title="My Offers" />
        <ChevronButton title="Clients" />
        <CreateTourButton />
      </div>
      <div className="search-and-management-buttons">
        <SearchBar />
        <ManagementButtons />
      </div>
    </div>
  );
};

export default AgencyUpperSection;
