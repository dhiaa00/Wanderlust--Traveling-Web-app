import React from "react";
import "./infoCard.css";
import UpperSectionForInfoCards from "./UpperSectionForInfoCards";

const ClientInfoCard = ({ clients }) => {
  const ClientNumber = 0;
  return (
    <div className="clients-info-card agency-tour-info-card">
      <UpperSectionForInfoCards title="Clients" />
      <div className="info-card-middle-section">{ClientNumber}</div>
      <div className="client-bottom-section">More Info</div>
    </div>
  );
};

export default ClientInfoCard;
