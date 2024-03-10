import React from "react";
import "./select.css";

const Select = ({ img, title }) => {
  return (
    <div className="select-wrapper">
      <div className="select">
        <img src={img} alt="guy" />
      </div>
      <h2>{title}</h2>
    </div>
  );
};

export default Select;
