import React from "react";

const Collaboration = ({ id, title, type, priority }) => {
  const priorityStyle = {
    backgroundColor:
      priority === "High" ? "red" : priority === "Medium" ? "orange" : "green",
  };
  return (
    <div className="collaboration">
      <p className="collaboration-item">{id}</p>
      <h3 className="collaboration-item">{title}</h3>
      <p className="collaboration-item">{type}</p>
      <p className="collaboration-item priority">
        <span style={priorityStyle}>{priority}</span>
      </p>
    </div>
  );
};

export default Collaboration;
