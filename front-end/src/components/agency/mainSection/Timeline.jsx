import React from "react";
import "./timeline.css";

const Timeline = ({ tour }) => {
  if (!tour || !tour.flightTime) {
    return null; // Or a loading indicator, or any other placeholder component
  }

  const flightTime = tour.flightTime;
  const hour = flightTime.split(":")[0];
  const minutes = flightTime.split(":")[1];
  const flightDuration = Number(tour.flightDuration);

  return (
    <div className="timeline">
      <h2>Timeline</h2>
      <div className="timeline-container">
        <div className="timeline-item">{`${hour - 1}:00`}</div>
        <div className="flight-timeline">
          {
            // repeat timeline-item from flightTime to flightTime + flightDuration
            Array.from({ length: flightDuration + 1 }, (_, i) => (
              <div className="timeline-item" key={i}>{`${
                Number(hour) + i
              }:${minutes}`}</div>
            ))
          }
        </div>
        <div className="timeline-item">{`${
          Number(hour) + flightDuration + 1
        }:00`}</div>
      </div>
    </div>
  );
};

export default Timeline;
