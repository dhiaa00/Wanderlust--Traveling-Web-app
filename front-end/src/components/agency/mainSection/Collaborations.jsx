import React from "react";
import Collaboration from "./Collaboration";
import MainButton from "../../buttons/MainButton";
import "./collaborations.css";

const Collaborations = () => {
  return (
    <div className="collaborations">
      <h2>Collaborations</h2>
      <div className="titles">
        <p>#</p>
        <p>Name</p>
        <p>Type</p>
        <p>Priority</p>
      </div>
      <div className="collaborations-container">
        <Collaboration id="1" title="Marval" type="Hotel" priority="High" />
        <Collaboration
          id="2"
          title="Naruto"
          type="restaurant"
          priority="Medium"
        />
        <Collaboration id="3" title="Djaroum" type="Kabyle" priority="Normal" />
        <Collaboration
          id="4"
          title="Boubechiche"
          type="Chawi"
          priority="Normal"
        />
      </div>
      <MainButton text="Add New Collaboration" />
    </div>
  );
};

export default Collaborations;
