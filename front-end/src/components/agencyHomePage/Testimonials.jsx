import React from "react";
import "./testimonials.css";

const Testimonials = () => {
  const agenciesNumber = 0;
  const collabNumber = 0;
  const usersNumber = 0;
  return (
    <div className="testimonials">
      <div className="testimonials-container">No Testimonials Yet</div>
      <div className="stats">
        <div className="stat">
          <h3>{agenciesNumber}</h3>
          <p>Agencies</p>
        </div>
        <div className="stat">
          <h3>{collabNumber}</h3>
          <p>Collaborators</p>
        </div>
        <div className="stat">
          <h3>{usersNumber}</h3>
          <p>Current Users</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
