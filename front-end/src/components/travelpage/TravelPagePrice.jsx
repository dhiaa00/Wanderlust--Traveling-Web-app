import React from "react";
import MapComponent from "../agency/mainSection/MapComponent";
import "/src/components/travelpage/travelpageprice.css";

const TravelPagePrice = ({ travel }) => {
  return (
    <div className="travelpage-price-container">
      <p className="travelpage-price-title">Price</p>
      <div className="travelpage-classes-prices-container">
        <div className="travelpage-thirdclass-container">
          <p className="class-title">Start Price</p>
          <div className="class-price-details-container">
            <p className="class-price">{travel.price} $</p>
            <p className="class-details">This offer is very economist,</p>
          </div>
          <button className="travelpage-class-getstarted">Reserve</button>
          <div className="travelpage-class-includes-container">
            <p className="class-include-title">Includes</p>
            <div className="class-includes">
              <p className="class-includes-options">
                <img
                  src="/src/SVGs/travelpage/Group 33977.svg"
                  alt=""
                  className="check-mark-thatlooksstupid"
                />
                Plan Ticket Second Class To Japan
              </p>
              <p className="class-includes-options">
                <img
                  src="/src/SVGs/travelpage/Group 33977.svg"
                  alt=""
                  className="check-mark-thatlooksstupid"
                />
                Lunch for 3 Days
              </p>
              <p className="class-includes-options">
                <img
                  src="/src/SVGs/travelpage/Group 33977.svg"
                  alt=""
                  className="check-mark-thatlooksstupid"
                />
                -40% Transport Between The Hotel And Fuji
              </p>
              <p className="class-includes-options">
                <img
                  src="/src/SVGs/travelpage/Group 33977.svg"
                  alt=""
                  className="check-mark-thatlooksstupid"
                />
                Hotel 3 Stars Looks Upon Mount Fuji
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="feedback-container">
        <MapComponent place={travel.placeTo} />
      </div>
    </div>
  );
};

export default TravelPagePrice;
