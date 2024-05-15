import React, { useEffect, useState } from "react";
import "./expenses.css";

const Expenses = ({ collaborations }) => {
  const [hotelsStyle, setHotelsStyle] = useState({
    width: `0%`,
    height: `0%`,
  });
  const [transportStyle, setTransportStyle] = useState({
    width: `0%`,
    height: `0%`,
  });
  const [otherStyle, setOtherStyle] = useState({
    width: `0%`,
    height: `0%`,
  });

  const [transportDataName, setTransportDataName] = useState("0%");
  const [hotelsDataName, setHotelsDataName] = useState("0%");
  const [otherDataName, setOtherDataName] = useState("0%");

  const percentages = { hotels: 0, transport: 0, other: 0 };

  const calculatePercentages = (collaborations) => {
    collaborations.forEach((collaboration) => {
      if (collaboration.type.toLowerCase() === "hotel") {
        percentages.hotels += 1;
      } else if (collaboration.type.toLowerCase() === "transport") {
        percentages.transport += 1;
      } else {
        percentages.other += 1;
      }
    });
    const total =
      percentages.hotels + percentages.transport + percentages.other;
    percentages.hotels = Math.round((percentages.hotels / total) * 100);
    percentages.transport = Math.round((percentages.transport / total) * 100);
    percentages.other = Math.round((percentages.other / total) * 100);
  };

  useEffect(() => {
    if (collaborations) {
      calculatePercentages(collaborations);
      setHotelsStyle({
        width: `${percentages.hotels / 1.3}%`,
        height: `${percentages.hotels / 1.3}%`,
      });
      setTransportStyle({
        width: `${percentages.transport / 1.3}%`,
        height: `${percentages.transport / 1.3}%`,
      });
      setOtherStyle({
        width: `${percentages.other / 1.3}%`,
        height: `${percentages.other / 1.3}%`,
      });
      setTransportDataName(`transport: ${percentages.transport}%`);
      setHotelsDataName(`hotels: ${percentages.hotels}%`);
      setOtherDataName(`other: ${percentages.other}%`);
    }
  }, [collaborations]);

  return (
    <div className="expenses">
      {!collaborations ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : collaborations.length === 0 ? (
        <p style={{ textAlign: "center" }}>No collaborations entered</p>
      ) : (
        <div>
          <div
            data-name={transportDataName}
            className="transport-expenses expense"
            style={transportStyle}>
            {collaborations && percentages.transport !== 0
              ? `${percentages.transport}%`
              : ""}
          </div>
          <div
            data-name={hotelsDataName}
            className="hotels-expenses expense"
            style={hotelsStyle}>
            {collaborations && percentages.hotels !== 0
              ? `${percentages.hotels}%`
              : ""}
          </div>
          <div
            data-name={otherDataName}
            className="other-expenses expense"
            style={otherStyle}>
            {collaborations && percentages.other !== 0
              ? `${percentages.other}%`
              : ""}
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;
