import React from "react";
import Collaboration from "./Collaboration";
import MainButton from "../../buttons/MainButton";
import "./collaborations.css";

const Collaborations = ({
  addCollaboration,
  setAddCollaboration,
  collaborations,
}) => {
  const handleAddCollaboration = () => {
    setAddCollaboration(true);
  };
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
        {collaborations &&
          collaborations.map((collaboration, i) => {
            return (
              <Collaboration
                key={i}
                id={i + 1}
                title={collaboration.name}
                type={collaboration.type}
                priority={collaboration.priority}
              />
            );
          })}
      </div>
      <MainButton
        onClickFunc={handleAddCollaboration}
        text="Add New Collaboration"
      />
    </div>
  );
};

export default Collaborations;
