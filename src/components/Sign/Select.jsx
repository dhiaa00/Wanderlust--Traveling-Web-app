import React from "react";
import "./select.css";
import { Link } from "react-router-dom";

const Select = ({ img, title }) => {
  return (
    <Link to={`${title.toLowerCase()}`}>
      <div className="select-wrapper">
        <div className="select">
          <img src={img} alt="guy" />
        </div>
        <h2>{title}</h2>
      </div>
    </Link>
  );
};

export default Select;
