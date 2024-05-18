import React from "react";
import "/src/components/travelpage/travelpagedescription.css";

const TravelPageDescription = ({ description }) => {
  return (
    <div className="travelpagedescription">
      <h3>Description</h3>
      <p>{description}</p>
    </div>
  );
};

export default TravelPageDescription;
